const fs = require('fs');
const path = require('path');

// --- SETTINGS ---
const SITE_URL = 'https://buro-sovetnik.com';
const COMPANY_NAME = 'Советникъ — Экспертное Бюро';
const DATE = new Date().toISOString().split('T')[0] + 'T00:00:00+03:00';

const constantsPath = path.join(process.cwd(), 'src/data/constants.tsx');

if (!fs.existsSync(constantsPath)) {
    console.error(`❌ Constants file not found at: ${constantsPath}`);
    process.exit(1);
}

const content = fs.readFileSync(constantsPath, 'utf8');

// --- 1. PARSE IMAGE IMPORTS ---
const imageMap = {};
const importRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s+['"].*?\/([a-zA-Z0-9_-]+\.[a-zA-Z0-9]+)['"]/g;
let match;
while ((match = importRegex.exec(content)) !== null) {
    imageMap[match[1]] = match[2];
}

// --- 2. EXTRACT SERVICES BLOCK ---
const startIdx = content.indexOf('export const SERVICES: Service[] = [');
if (startIdx === -1) {
    console.error('❌ SERVICES array block not found in constants.tsx');
    process.exit(1);
}

let bracketCount = 1;
let endIdx = startIdx + 'export const SERVICES: Service[] = ['.length;
let servicesText = '';

while (bracketCount > 0 && endIdx < content.length) {
    const char = content[endIdx];
    if (char === '[') bracketCount++;
    if (char === ']') bracketCount--;
    servicesText += char;
    endIdx++;
}

// --- 3. EXTRACT INDIVIDUAL SERVICE OBJECTS ---
const serviceBlocks = [];
let tempBlock = '';
let braceCount = 0;
let inString = false;
let stringChar = '';

for (let i = 0; i < servicesText.length; i++) {
    const char = servicesText[i];
    if ((char === '"' || char === "'" || char === "`") && servicesText[i-1] !== '\\') {
        if (!inString) {
            inString = true;
            stringChar = char;
        } else if (stringChar === char) {
            inString = false;
        }
    }
    if (!inString) {
        if (char === '{') {
            braceCount++;
        }
        if (char === '}') {
            braceCount--;
            if (braceCount === 0) {
                tempBlock += char;
                serviceBlocks.push(tempBlock);
                tempBlock = '';
                continue;
            }
        }
    }
    if (braceCount > 0) {
        tempBlock += char;
    }
}

// --- 4. LIST OF KNOWN FEED IMAGES FOR DEFENSIVE FALLBACKS ---
const feedImages = new Set([
    "auto_technical_hero_1771709887787.webp",
    "blueprints_digital_audit_1771709962079.webp",
    "construction.webp",
    "construction_damage.webp",
    "construction_estimate_expert_1771709934929.webp",
    "construction_forensic.webp",
    "construction_pretrial.webp",
    "construction_surveying.webp",
    "construction_tech.webp",
    "finance_accounting.webp",
    "finance_audit.webp",
    "finance_handwriting.webp",
    "finance_insolvency.webp",
    "finance_legal.webp",
    "financial.webp",
    "hero_court.webp",
    "home-hero.webp",
    "industrial_machinery_valuation_1771709948073.webp",
    "road_construction_expert_1771709915978.webp",
    "themis.webp",
    "valuation.webp",
    "valuation_apartment.webp",
    "valuation_business.webp",
    "valuation_commercial.webp",
    "valuation_ip.webp",
    "valuation_land.webp",
    "water_damage_expert_1771709902470.webp"
]);

// --- 5. PARSE SERVICES ---
const parsedServices = serviceBlocks.map((block) => {
    const getField = (fieldRegex) => {
        const match = block.match(fieldRegex);
        return match ? match[1] : null;
    };
    
    const id = getField(/id:\s*["'`](.*?)["'`]/);
    const title = getField(/title:\s*["'`](.*?)["'`]/);
    const shortDesc = getField(/shortDesc:\s*["'`](.*?)["'`]/);
    const fullDesc = getField(/fullDesc:\s*["'`](.*?)["'`]/);
    const priceStart = getField(/priceStart:\s*["'`](.*?)["'`]/);
    const categorySlug = getField(/categorySlug:\s*["'`](.*?)["'`]/);
    const categoryLabel = getField(/categoryLabel:\s*["'`](.*?)["'`]/);
    const duration = getField(/duration:\s*["'`](.*?)["'`]/);
    const slug = getField(/slug:\s*["'`](.*?)["'`]/);
    const heroImageVar = getField(/heroImage:\s*([a-zA-Z0-9_]+)/);

    const actualSlug = slug || id;

    // Resolve image filename using map & verify existence in feed folder
    let imageFilename = imageMap[heroImageVar] || 'logo-clone.webp';
    if (!feedImages.has(imageFilename)) {
        // Fallback mapping based on category slug
        if (categorySlug === 'financial') imageFilename = 'finance_audit.webp';
        else if (categorySlug === 'construction') imageFilename = 'construction_pretrial.webp';
        else if (categorySlug === 'valuation') imageFilename = 'valuation_business.webp';
        else if (categorySlug === 'land') imageFilename = 'construction_surveying.webp';
        else if (categorySlug === 'handwriting') imageFilename = 'finance_handwriting.webp';
        else if (categorySlug === 'legal') imageFilename = 'finance_legal.webp';
        else if (categorySlug === 'intellectual_property') imageFilename = 'valuation_ip.webp';
        else if (categorySlug === 'reviews') imageFilename = 'construction_forensic.webp';
        else if (categorySlug === 'auto') imageFilename = 'auto_technical_hero_1771709887787.webp';
        else imageFilename = 'finance_audit.webp';
    }

    // Parse price to integer
    const price = priceStart ? parseInt(priceStart.replace(/[^0-9]/g, ''), 10) : 10000;

    return {
        id: actualSlug,
        title,
        desc: shortDesc || fullDesc || title,
        price: price || 10000,
        categorySlug,
        categoryLabel: categoryLabel || 'Услуги',
        imageFilename
    };
});

// --- 6. GENERATE XML ---
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${DATE}">
    <shop>
        <name>${COMPANY_NAME}</name>
        <company>${COMPANY_NAME}</company>
        <url>${SITE_URL}</url>
        <currencies>
            <currency id="RUR" rate="1"/>
        </currencies>
        <categories>
            <category id="1">Финансовая экспертиза</category>
            <category id="2">Строительная экспертиза</category>
            <category id="3">Оценка</category>
            <category id="4">Земельная экспертиза</category>
            <category id="5">Почерковедческая экспертиза</category>
            <category id="6">Юридические услуги</category>
            <category id="7">Оспаривание экспертиз</category>
            <category id="8">Автотехническая экспертиза</category>
        </categories>
        <offers>
            ${parsedServices.map(service => {
                let catId = 1;
                let categoryName = "Финансовая экспертиза";

                if (service.categorySlug === 'financial') {
                    catId = 1;
                    categoryName = "Финансовая экспертиза";
                } else if (service.categorySlug === 'construction') {
                    catId = 2;
                    categoryName = "Строительная экспертиза";
                } else if (service.categorySlug === 'valuation') {
                    catId = 3;
                    categoryName = "Оценка";
                } else if (service.categorySlug === 'land') {
                    catId = 4;
                    categoryName = "Земельная экспертиза";
                } else if (service.categorySlug === 'handwriting') {
                    catId = 5;
                    categoryName = "Почерковедческая экспертиза";
                } else if (service.categorySlug === 'legal') {
                    catId = 6;
                    categoryName = "Юридические услуги";
                } else if (service.categorySlug === 'intellectual_property') {
                    catId = 3;
                    categoryName = "Оценка";
                } else if (service.categorySlug === 'reviews') {
                    catId = 7;
                    categoryName = "Оспаривание экспертиз";
                } else if (service.categorySlug === 'auto') {
                    catId = 8;
                    categoryName = "Автотехническая экспертиза";
                }

                // Double escape XML chars
                const cleanTitle = service.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                const cleanDesc = service.desc.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

                return `
            <offer id="${service.id}">
                <name>${cleanTitle}</name>
                <url>${SITE_URL}/services/${service.id}</url>
                <price>${service.price}</price>
                <currencyId>RUR</currencyId>
                <categoryId>${catId}</categoryId>
                <picture>${SITE_URL}/assets/feed/${service.imageFilename}</picture>
                <description>${cleanTitle}. ${cleanDesc}</description>
                <delivery>false</delivery>
                <pickup>false</pickup>
                <store>false</store>
                <set-ids>sovetnik_services</set-ids>
                <param name="Тип предложения">Услуга</param>
                <param name="Исполнитель">ООО «Экспертное Бюро Советникъ»</param>
                <param name="Тип услуги">${categoryName}</param>
                <param name="Формат работы">В офисе и с выездом</param>
                <param name="Годы опыта">15</param>
            </offer>`;
            }).join('')}
        </offers>
    </shop>
</yml_catalog>`;

// --- 7. WRITE TO FILE SYSTEM ---
// Write to public/
fs.writeFileSync(path.join(process.cwd(), 'public/yandex-feed.yml'), xml);
console.log(`✅ Generated public/yandex-feed.yml with ${parsedServices.length} services!`);

// Write to dist/ (if it exists)
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
    fs.writeFileSync(path.join(distPath, 'yandex-feed.yml'), xml);
    console.log('✅ Copied yandex-feed.yml to dist/ for immediate deployment!');
} else {
    console.log('ℹ️ dist/ directory not found yet. It will be copied during the build copy phase.');
}
