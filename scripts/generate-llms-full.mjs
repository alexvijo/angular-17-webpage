// Genera src/llms-full.txt: llms.txt + perfil + texto completo de todos los posts del blog.
// Se ejecuta antes de cada build (npm run prebuild) para que nunca quede desactualizado.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://alex-vicente.dev';

async function loadPosts() {
  const ts = readFileSync(join(root, 'src/app/data/blog-posts.ts'), 'utf8')
    .replace(/export type BlogPost = \{[\s\S]*?\n\};/, '')
    .replace('BLOG_POSTS: BlogPost[]', 'BLOG_POSTS');
  const mod = await import('data:text/javascript;base64,' + Buffer.from(ts).toString('base64'));
  return mod.BLOG_POSTS;
}

function loadProfile(lang) {
  const i18n = JSON.parse(readFileSync(join(root, `src/assets/i18n/${lang}.json`), 'utf8'));
  const strip = (s) => String(s).replace(/<[^>]+>/g, '').replace(/_$/, '').trim();
  const skills = Object.entries(i18n)
    .filter(([k]) => k.startsWith('Skills.'))
    .map(([k, v]) => `- ${k.slice(7)}: ${strip(v)}`);
  const projects = (i18n['OtherProjects.Projects'] ?? [])
    .map((p) => `- ${strip(p.Title)}: ${strip(p.Description)} (${p.Technologies.join(', ')})`);
  const faq = (i18n['Faq.Items'] ?? []).map((f) => `Q: ${f.question}\nA: ${f.answer}`);
  return [
    `## ${lang === 'es' ? 'Perfil' : 'Profile'} (${lang})`,
    `${strip(i18n['Banner.Role'])} — ${strip(i18n['Banner.Description'])}`,
    '',
    ...(i18n['AboutMe.Paragraphs'] ?? []).map(strip),
    '',
    `### Skills`, ...skills,
    '',
    `### ${lang === 'es' ? 'Proyectos' : 'Projects'}`, ...projects,
    '',
    `### FAQ`, ...faq,
  ].join('\n');
}

const posts = (await loadPosts()).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
const out = [
  readFileSync(join(root, 'src/llms.txt'), 'utf8').trim(),
  '',
  '---',
  '',
  loadProfile('es'),
  '',
  loadProfile('en'),
  '',
  '---',
  '',
  '## Blog — full text',
  '',
  ...posts.flatMap((p) => [
    `### ${p.titleEs}`,
    `URL: ${SITE}/es/blog/${p.slugEs}`,
    `Published: ${p.publishedAt} · Author: Alex Vicente`,
    '',
    p.excerptEs, '', ...p.bodyEs.flatMap((x) => [x, '']),
    `### ${p.titleEn}`,
    `URL: ${SITE}/en/blog/${p.slugEn}`,
    `Published: ${p.publishedAt} · Author: Alex Vicente`,
    '',
    p.excerptEn, '', ...p.bodyEn.flatMap((x) => [x, '']),
  ]),
].join('\n');

writeFileSync(join(root, 'src/llms-full.txt'), out);
console.log(`llms-full.txt generado: ${posts.length} posts, ${out.length} caracteres`);
