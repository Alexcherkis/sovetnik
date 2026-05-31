import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '..', 'src', 'assets', 'images');
const publicDir = path.join(__dirname, '..', 'public');

// Ensure public dir exists for favicons
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

async function optimizeImages() {
    console.log('🚀 Starting image optimization...');

    // Helper to process a directory recursively
    const processDirectory = async (dir) => {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                await processDirectory(fullPath);
            } else if (item.match(/\.(png|jpg|jpeg)$/)) {
                const filename = path.parse(item).name;
                const webpPath = path.join(dir, `${filename}.webp`);

                try {
                    await sharp(fullPath)
                        .webp({ quality: 80, effort: 6 })
                        .toFile(webpPath);
                    console.log(`✅ Converted: ${path.relative(imagesDir, fullPath)} -> ${filename}.webp`);
                } catch (err) {
                    console.error(`❌ Error processing ${item}:`, err);
                }
            }
        }
    };

    await processDirectory(imagesDir);

    // --- FAVICON GENERATION ---
    console.log('✨ Generating Favicons...');
    const faviconSvg = path.join(publicDir, 'favicon.svg');

    if (fs.existsSync(faviconSvg)) {
        // 1. apple-touch-icon.png (180x180)
        await sharp(faviconSvg)
            .resize(180, 180)
            .png()
            .toFile(path.join(publicDir, 'apple-touch-icon.png'));
        console.log('✅ Generated apple-touch-icon.png');

        // 2. favicon-32x32.png
        await sharp(faviconSvg)
            .resize(32, 32)
            .png()
            .toFile(path.join(publicDir, 'favicon-32x32.png'));
        console.log('✅ Generated favicon-32x32.png');

        // 3. favicon-16x16.png
        await sharp(faviconSvg)
            .resize(16, 16)
            .png()
            .toFile(path.join(publicDir, 'favicon-16x16.png'));
        console.log('✅ Generated favicon-16x16.png');

        // 4. android-chrome-192x192.png
        await sharp(faviconSvg)
            .resize(192, 192)
            .png()
            .toFile(path.join(publicDir, 'android-chrome-192x192.png'));

        // 5. android-chrome-512x512.png
        await sharp(faviconSvg)
            .resize(512, 512)
            .png()
            .toFile(path.join(publicDir, 'android-chrome-512x512.png'));

        console.log('✅ Generated Android icons');
    } else {
        console.warn('⚠️ No favicon.svg found in public/');
    }

    console.log('🎉 Optimization complete!');
}

optimizeImages();
