import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import AdmZip from 'adm-zip';

const ROOT = process.cwd();
const SOURCES_PATH = path.join(ROOT, 'scripts', 'ai-blog-sources.json');
const BLOG_POSTS_PATH = path.join(ROOT, 'src', 'app', 'data', 'blog-posts.ts');

const DEFAULT_MAX_POSTS = 2;
const MAX_SOURCE_TEXT_CHARS = 10000;
const MAX_BODY_PARAGRAPHS = 3;
const DEFAULT_GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const MAX_LLM_RETRIES = Number(process.env.LLM_MAX_RETRIES || 3);
const BASE_RETRY_MS = Number(process.env.LLM_BASE_RETRY_MS || 8000);
const ENABLE_TEMPLATE_FALLBACK = process.env.ENABLE_TEMPLATE_FALLBACK === 'true';

function decodeHtmlEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripHtml(input) {
  return decodeHtmlEntities(
    input
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

function getXmlTag(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match?.[1]?.trim() ?? '';
}

function slugify(input) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function toSingleQuotedTsString(text) {
  return `'${text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r?\n/g, ' ')}'`;
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function firstWords(text, count) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  return words.slice(0, count).join(' ');
}

function getGeminiRetryDelayMs(errorText, attempt) {
  const retrySeconds = String(errorText || '').match(/"retryDelay"\s*:\s*"(\d+)s"/i)?.[1];
  if (retrySeconds) {
    return Number(retrySeconds) * 1000;
  }
  return BASE_RETRY_MS * attempt;
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

async function loadSourcesConfig() {
  return readJson(SOURCES_PATH);
}

async function fetchYouTubeEntries(channelId) {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const response = await fetch(url, { headers: { 'User-Agent': 'alexvijo-bot/1.0' } });

  if (!response.ok) {
    throw new Error(`YouTube feed failed for channel ${channelId} with status ${response.status}`);
  }

  const xml = await response.text();
  const entries = [];
  const matches = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

  for (const entryXml of matches) {
    const title = getXmlTag(entryXml, 'title');
    const publishedAt = getXmlTag(entryXml, 'published');
    const mediaDescription = getXmlTag(entryXml, 'media:description');
    const linkMatch = entryXml.match(/<link[^>]*href="([^"]+)"/i);
    const link = linkMatch?.[1] ?? '';

    if (!title || !link) {
      continue;
    }

    entries.push({
      title,
      url: link,
      publishedAt,
      text: `${title}. ${mediaDescription}`.trim()
    });
  }

  return entries;
}

async function fetchWebText(url) {
  const response = await fetch(url, { headers: { 'User-Agent': 'alexvijo-bot/1.0' } });

  if (!response.ok) {
    throw new Error(`Web source failed for ${url} with status ${response.status}`);
  }

  const html = await response.text();
  return stripHtml(html).slice(0, MAX_SOURCE_TEXT_CHARS);
}

function readZipTextEntry(zip, entryName) {
  const normalized = entryName.replace(/\\/g, '/');
  const entry = zip.getEntry(normalized);
  if (!entry) {
    return '';
  }
  return zip.readAsText(entry, 'utf8');
}

function resolveRelativeZipPath(baseFile, relativePath) {
  const baseDir = path.posix.dirname(baseFile);
  return path.posix.normalize(path.posix.join(baseDir, relativePath));
}

async function readEpubText(epubPath) {
  const absolutePath = path.isAbsolute(epubPath) ? epubPath : path.join(ROOT, epubPath);
  const zip = new AdmZip(absolutePath);

  const containerXml = readZipTextEntry(zip, 'META-INF/container.xml');
  const opfRelativePath = containerXml.match(/full-path="([^"]+)"/i)?.[1];

  if (!opfRelativePath) {
    throw new Error(`EPUB does not expose package path: ${epubPath}`);
  }

  const opfXml = readZipTextEntry(zip, opfRelativePath);
  if (!opfXml) {
    throw new Error(`Cannot read OPF file in EPUB: ${epubPath}`);
  }

  const manifest = new Map();
  const itemMatches = opfXml.match(/<item\s+[^>]*>/gi) ?? [];
  for (const item of itemMatches) {
    const id = item.match(/id="([^"]+)"/i)?.[1];
    const href = item.match(/href="([^"]+)"/i)?.[1];
    if (id && href) {
      manifest.set(id, resolveRelativeZipPath(opfRelativePath, href));
    }
  }

  const spineItemRefs = opfXml.match(/<itemref\s+[^>]*>/gi) ?? [];
  const orderedHtmlFiles = [];
  for (const itemRef of spineItemRefs) {
    const idRef = itemRef.match(/idref="([^"]+)"/i)?.[1];
    if (!idRef) {
      continue;
    }
    const file = manifest.get(idRef);
    if (file) {
      orderedHtmlFiles.push(file);
    }
  }

  const chunks = [];
  for (const htmlFile of orderedHtmlFiles.slice(0, 4)) {
    const chapterXml = readZipTextEntry(zip, htmlFile);
    if (!chapterXml) {
      continue;
    }
    const text = stripHtml(chapterXml);
    if (text.length > 0) {
      chunks.push(text);
    }
  }

  return chunks.join(' ').slice(0, MAX_SOURCE_TEXT_CHARS);
}

async function buildCandidates(config) {
  const candidates = [];

  for (const channel of ensureArray(config.youtubeChannels)) {
    try {
      const entries = await fetchYouTubeEntries(channel.channelId);
      for (const entry of entries.slice(0, 4)) {
        candidates.push({
          sourceName: channel.name,
          sourceType: 'youtube',
          title: entry.title,
          url: entry.url,
          publishedAt: entry.publishedAt,
          sourceText: entry.text
        });
      }
    } catch (error) {
      console.warn(`Skipping YouTube channel ${channel.name}: ${error.message}`);
    }
  }

  for (const source of ensureArray(config.webSources)) {
    try {
      const text = await fetchWebText(source.url);
      candidates.push({
        sourceName: source.name,
        sourceType: 'web',
        title: source.name,
        url: source.url,
        publishedAt: new Date().toISOString(),
        sourceText: text
      });
    } catch (error) {
      console.warn(`Skipping web source ${source.name}: ${error.message}`);
    }
  }

  for (const source of ensureArray(config.epubSources)) {
    try {
      const text = await readEpubText(source.path);
      candidates.push({
        sourceName: source.name,
        sourceType: 'epub',
        title: source.name,
        url: `file:${source.path}`,
        publishedAt: new Date().toISOString(),
        sourceText: text
      });
    } catch (error) {
      console.warn(`Skipping EPUB source ${source.name}: ${error.message}`);
    }
  }

  return candidates
    .filter((candidate) => candidate.sourceText && candidate.sourceText.length > 100)
    .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
}

function getUsedUrls(blogPostsFileContent) {
  const usedUrls = new Set();
  const regex = /youtubeUrl:\s*'([^']+)'/g;
  for (const match of blogPostsFileContent.matchAll(regex)) {
    usedUrls.add(match[1]);
  }
  return usedUrls;
}

async function generatePostWithGemini({ apiKey, model, config, candidate }) {
  const requiredKeywordsEs = ensureArray(config.requiredKeywordsEs).join(', ');
  const requiredKeywordsEn = ensureArray(config.requiredKeywordsEn).join(', ');

  const prompt = `You are generating one bilingual blog post object for a developer portfolio.
Main theme ES: ${config.themeEs}
Main theme EN: ${config.themeEn}
Required keywords ES (prioritize naturally): ${requiredKeywordsEs}
Required keywords EN (prioritize naturally): ${requiredKeywordsEn}

Source type: ${candidate.sourceType}
Source name: ${candidate.sourceName}
Source title: ${candidate.title}
Source URL: ${candidate.url}
Source text:
${candidate.sourceText.slice(0, 3500)}

Return ONLY valid JSON object with this exact schema:
{
  "titleEs": "...",
  "titleEn": "...",
  "excerptEs": "...",
  "excerptEn": "...",
  "bodyEs": ["...", "...", "..."],
  "bodyEn": ["...", "...", "..."],
  "keywords": ["...", "...", "...", "...", "..."]
}

Rules:
- Focus on future of employment, adaptation speed, jobs transforming, jobs disappearing, and new roles.
- Mention technology sector impacts and practical career adaptation.
- Use neutral, analytical tone.
- No markdown, no emojis.
- bodyEs/bodyEn must contain exactly ${MAX_BODY_PARAGRAPHS} paragraphs each.
- Keep excerpt under 180 chars.
- At least 2 keywords must relate to labor market transformation.
- Do not hallucinate facts; if uncertain, use careful language.`;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  let payload;

  for (let attempt = 1; attempt <= MAX_LLM_RETRIES; attempt += 1) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: 'application/json'
        }
      })
    });

    if (response.ok) {
      payload = await response.json();
      break;
    }

    const errorBody = await response.text();
    const shouldRetry = response.status === 429 || response.status === 503;

    if (!shouldRetry || attempt === MAX_LLM_RETRIES) {
      throw new Error(`Gemini request failed (${response.status}): ${errorBody}`);
    }

    const delayMs = getGeminiRetryDelayMs(errorBody, attempt);
    console.warn(`Gemini transient error (${response.status}). Retrying in ${delayMs}ms... [attempt ${attempt}/${MAX_LLM_RETRIES}]`);
    await sleep(delayMs);
  }

  if (!payload) {
    throw new Error('Gemini response payload is empty after retries.');
  }

  const rawText = payload?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error('Gemini response did not include generated JSON content.');
  }

  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error('Gemini returned non-JSON output.');
  }

  const titleEs = String(parsed.titleEs || '').trim();
  const titleEn = String(parsed.titleEn || '').trim();
  const excerptEs = String(parsed.excerptEs || '').trim();
  const excerptEn = String(parsed.excerptEn || '').trim();
  const bodyEs = ensureArray(parsed.bodyEs).map((item) => String(item).trim()).filter(Boolean).slice(0, MAX_BODY_PARAGRAPHS);
  const bodyEn = ensureArray(parsed.bodyEn).map((item) => String(item).trim()).filter(Boolean).slice(0, MAX_BODY_PARAGRAPHS);
  const keywords = ensureArray(parsed.keywords).map((item) => String(item).trim()).filter(Boolean).slice(0, 6);

  if (!titleEs || !titleEn || !excerptEs || !excerptEn || bodyEs.length < MAX_BODY_PARAGRAPHS || bodyEn.length < MAX_BODY_PARAGRAPHS || keywords.length < 3) {
    throw new Error('Gemini response is missing required fields.');
  }

  const today = new Date().toISOString().slice(0, 10);
  const slugEs = slugify(titleEs);
  const slugEn = slugify(titleEn);

  return {
    slugEs,
    slugEn,
    titleEs,
    titleEn,
    excerptEs,
    excerptEn,
    youtubeUrl: candidate.url,
    bodyEs,
    bodyEn,
    keywords,
    publishedAt: today
  };
}

function generatePostWithTemplate({ config, candidate }) {
  const today = new Date().toISOString().slice(0, 10);
  const shortSource = firstWords(candidate.sourceText, 120);
  const sourceLabel = candidate.sourceType === 'youtube' ? 'video' : candidate.sourceType;
  const titleEs = `IA y empleo: claves desde ${candidate.sourceName}`;
  const titleEn = `AI and jobs: key takeaways from ${candidate.sourceName}`;

  return {
    slugEs: slugify(`${titleEs}-${today}`),
    slugEn: slugify(`${titleEn}-${today}`),
    titleEs,
    titleEn,
    excerptEs: `Lectura rapida sobre adaptacion laboral y velocidad de cambio en tecnologia a partir de ${sourceLabel}s recientes.`,
    excerptEn: `A quick read on workforce adaptation and speed of change in tech based on recent ${sourceLabel} sources.`,
    youtubeUrl: candidate.url,
    bodyEs: [
      `El mercado laboral tecnologico se esta reconfigurando con rapidez. Esta fuente (${candidate.sourceName}) aporta senales sobre como cambian los perfiles, las tareas y la demanda de habilidades.`,
      `La adaptacion efectiva combina tres frentes: alfabetizacion en IA, rediseño de procesos y aprendizaje continuo en herramientas. Esto acelera la productividad y reduce riesgo de obsolescencia profesional.`,
      `Sintesis de la fuente: ${shortSource}. Para equipos de producto, la prioridad es convertir estas senales en planes concretos de upskilling, automatizacion responsable y nuevos roles.`
    ],
    bodyEn: [
      `The tech labor market is being reshaped quickly. This source (${candidate.sourceName}) provides signals on how profiles, tasks, and skill demand are changing.`,
      `Effective adaptation combines three fronts: AI literacy, process redesign, and continuous tooling practice. This boosts productivity and lowers professional obsolescence risk.`,
      `Source synthesis: ${shortSource}. For product teams, the priority is to turn these signals into concrete plans for upskilling, responsible automation, and new role design.`
    ],
    keywords: [
      'future of jobs',
      'AI workforce',
      'reskilling',
      'technology sector',
      'automation'
    ],
    publishedAt: today
  };
}

function serializeBlogPost(post) {
  const bodyEs = post.bodyEs.map((paragraph) => `      ${toSingleQuotedTsString(paragraph)}`).join(',\n');
  const bodyEn = post.bodyEn.map((paragraph) => `      ${toSingleQuotedTsString(paragraph)}`).join(',\n');
  const keywords = post.keywords.map((keyword) => toSingleQuotedTsString(keyword)).join(', ');

  return `  {\n    slugEs: ${toSingleQuotedTsString(post.slugEs)},\n    slugEn: ${toSingleQuotedTsString(post.slugEn)},\n    titleEs: ${toSingleQuotedTsString(post.titleEs)},\n    titleEn: ${toSingleQuotedTsString(post.titleEn)},\n    excerptEs: ${toSingleQuotedTsString(post.excerptEs)},\n    excerptEn: ${toSingleQuotedTsString(post.excerptEn)},\n    youtubeUrl: ${toSingleQuotedTsString(post.youtubeUrl)},\n    bodyEs: [\n${bodyEs}\n    ],\n    bodyEn: [\n${bodyEn}\n    ],\n    keywords: [${keywords}],\n    publishedAt: ${toSingleQuotedTsString(post.publishedAt)}\n  }`;
}

async function prependPostsToBlogData(newPosts) {
  if (newPosts.length === 0) {
    return false;
  }

  const currentContent = await fs.readFile(BLOG_POSTS_PATH, 'utf-8');
  const marker = 'export const BLOG_POSTS: BlogPost[] = [';
  const markerIndex = currentContent.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error('Could not find BLOG_POSTS marker in blog-posts.ts.');
  }

  const insertAt = markerIndex + marker.length;
  const serialized = `\n${newPosts.map(serializeBlogPost).join(',\n')} ,`;
  const updated = `${currentContent.slice(0, insertAt)}${serialized}${currentContent.slice(insertAt)}`;

  await fs.writeFile(BLOG_POSTS_PATH, updated, 'utf-8');
  return true;
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY environment variable.');
  }

  const model = DEFAULT_GEMINI_MODEL;

  const config = await loadSourcesConfig();
  const blogDataBefore = await fs.readFile(BLOG_POSTS_PATH, 'utf-8');
  const usedUrls = getUsedUrls(blogDataBefore);
  const candidates = await buildCandidates(config);

  const maxPostsPerRun = Number(config.maxPostsPerRun || DEFAULT_MAX_POSTS);
  const selectedCandidates = candidates.filter((candidate) => !usedUrls.has(candidate.url)).slice(0, maxPostsPerRun);

  if (selectedCandidates.length === 0) {
    console.log('No new candidates found. Blog remains unchanged.');
    return;
  }

  const generatedPosts = [];
  const usedSlugs = new Set();

  for (const candidate of selectedCandidates) {
    try {
      const post = await generatePostWithGemini({ apiKey, model, config, candidate });
      if (usedSlugs.has(post.slugEs) || usedSlugs.has(post.slugEn)) {
        console.warn(`Skipping duplicate slug from source ${candidate.sourceName}.`);
        continue;
      }
      usedSlugs.add(post.slugEs);
      usedSlugs.add(post.slugEn);
      generatedPosts.push(post);
      console.log(`Generated post from ${candidate.sourceType}: ${candidate.title}`);
    } catch (error) {
      console.warn(`Could not generate post from ${candidate.sourceName}: ${error.message}`);
      if (ENABLE_TEMPLATE_FALLBACK) {
        const fallbackPost = generatePostWithTemplate({ config, candidate });
        if (!usedSlugs.has(fallbackPost.slugEs) && !usedSlugs.has(fallbackPost.slugEn)) {
          usedSlugs.add(fallbackPost.slugEs);
          usedSlugs.add(fallbackPost.slugEn);
          generatedPosts.push(fallbackPost);
          console.log(`Generated fallback post from ${candidate.sourceType}: ${candidate.title}`);
        }
      }
    }
  }

  const changed = await prependPostsToBlogData(generatedPosts);
  if (changed) {
    console.log(`Prepended ${generatedPosts.length} new posts to blog-posts.ts`);
  } else {
    console.log('No posts were generated.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
