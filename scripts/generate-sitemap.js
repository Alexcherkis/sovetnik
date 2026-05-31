import fs from 'fs';
import path from 'path';

/**
 * ПРЕМИУМ-ГЕНЕРАТОР КАРТЫ САЙТА (SITEMAP)
 * Автоматически извлекает данные из constants.tsx и строит полную структуру PSEO.
 */

const BASE_URL = 'https://buro-sovetnik.com';
const TODAY = new Date().toISOString().split('T')[0];

const constantsPath = path.join(process.cwd(), 'src', 'data', 'constants.tsx');
const constantsContent = fs.readFileSync(constantsPath, 'utf8');

// --- Извлечение данных через Regex (чтобы не тянуть TS зависимости в Node) ---

const extractSlugs = (content, startMarker, endMarker) => {
    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker, startIndex);
    const section = content.substring(startIndex, endIndex);
    const matches = section.match(/slug:\s*["']([^"']+)["']/g) || [];
    return [...new Set(matches.map(m => m.match(/["']([^"']+)["']/)[1]))];
};

// 1. Извлекаем сервисы
const serviceSlugs = extractSlugs(constantsContent, 'export const SERVICES', '];');

// 2. Извлекаем города
const citySlugs = extractSlugs(constantsContent, 'export const CITIES', '];');

// 3. Категории (фиксированный список, т.к. это объект, а не массив)
const categories = ['financial', 'construction', 'valuation', 'land', 'handwriting', 'legal', 'intellectual_property', 'reviews'];

const STATIC_ROUTES = [
    '',
    '/about',
    '/contacts',
    '/faq',
    '/price',
    '/blog',
    '/team',
    '/reviews',
    '/services'
];

const buildUrlsetXml = (urls) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
};

const buildSitemapIndexXml = (sitemaps) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sm => `  <sitemap>
    <loc>${sm.loc}</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;
};

function generateSitemap() {
    let coreUrls = [];
    let pseoUrls = [];

    // 1. Статические страницы
    STATIC_ROUTES.forEach(route => {
        coreUrls.push({
            loc: `${BASE_URL}${route}`,
            priority: route === '' ? '1.0' : '0.8',
            changefreq: 'weekly'
        });
    });

    // 2. Категории (в core) и Категории x Города (в pseo)
    categories.forEach(cat => {
        coreUrls.push({
            loc: `${BASE_URL}/services/category/${cat}`,
            priority: '0.9',
            changefreq: 'weekly'
        });

        citySlugs.forEach(citySlug => {
            pseoUrls.push({
                loc: `${BASE_URL}/services/category/${cat}/${citySlug}`,
                priority: '0.6',
                changefreq: 'monthly'
            });
        });
    });

    // 3. Услуги (в core) и Услуги x Города (в pseo)
    serviceSlugs.forEach(serviceSlug => {
        coreUrls.push({
            loc: `${BASE_URL}/services/${serviceSlug}`,
            priority: '0.9',
            changefreq: 'weekly'
        });

        citySlugs.forEach(citySlug => {
            pseoUrls.push({
                loc: `${BASE_URL}/services/${serviceSlug}/${citySlug}`,
                priority: '0.7',
                changefreq: 'monthly'
            });
        });
    });

    // 4. Блог (опционально, если нужно)
    // Извлечем слаги постов
    const blogSlugs = extractSlugs(constantsContent, 'export const BLOG_POSTS', '];');
    blogSlugs.forEach(postSlug => {
        coreUrls.push({
            loc: `${BASE_URL}/blog/${postSlug}`,
            priority: '0.6',
            changefreq: 'monthly'
        });
    });

    const publicDir = path.join(process.cwd(), 'public');
    const sitemapCorePath = path.join(publicDir, 'sitemap-core.xml');
    const sitemapPseoPath = path.join(publicDir, 'sitemap-pseo.xml');
    const sitemapIndexPath = path.join(publicDir, 'sitemap-index.xml');

    fs.writeFileSync(sitemapCorePath, buildUrlsetXml(coreUrls));
    fs.writeFileSync(sitemapPseoPath, buildUrlsetXml(pseoUrls));

    fs.writeFileSync(
        sitemapIndexPath,
        buildSitemapIndexXml([
            { loc: `${BASE_URL}/sitemap-core.xml` },
            { loc: `${BASE_URL}/sitemap-pseo.xml` }
        ])
    );

    // Backward-compat: keep sitemap.xml as sitemap index
    const legacySitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(legacySitemapPath, fs.readFileSync(sitemapIndexPath, 'utf8'));

    console.log(`✅ Sitemap generated: core=${coreUrls.length}, pseo=${pseoUrls.length}, total=${coreUrls.length + pseoUrls.length}`);
}

generateSitemap();
