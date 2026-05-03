import sharp from 'sharp';
import { readFileSync, unlinkSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = resolve(__dirname, '../src/assets/images');

async function run() {
  // 1. Convert about-me photo to WebP + optimized JPG
  const src = `${assetsDir}/about-me-extracted.jpeg`;

  await sharp(src)
    .webp({ quality: 82 })
    .toFile(`${assetsDir}/about-me.webp`);

  await sharp(src)
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${assetsDir}/about-me.jpg`);

  // 2. Optimize picofme.png → WebP + optimized PNG for og:image
  const ogSrc = `${assetsDir}/picofme.png`;

  await sharp(ogSrc)
    .webp({ quality: 85 })
    .toFile(`${assetsDir}/picofme.webp`);

  await sharp(ogSrc)
    .png({ compressionLevel: 9, palette: false })
    .toFile(`${assetsDir}/picofme-opt.png`);

  // 3. Report sizes
  const files = ['about-me.webp', 'about-me.jpg', 'picofme.webp', 'picofme-opt.png', 'picofme.png'];
  const { statSync } = await import('fs');
  console.log('\nImage sizes:');
  for (const f of files) {
    const p = `${assetsDir}/${f}`;
    if (existsSync(p)) {
      const kb = (statSync(p).size / 1024).toFixed(1);
      console.log(`  ${f.padEnd(22)} ${kb} KB`);
    }
  }

  // 4. Remove extracted temp file
  unlinkSync(src);
  console.log('\nDone. Removed about-me-extracted.jpeg');
}

run().catch(console.error);
