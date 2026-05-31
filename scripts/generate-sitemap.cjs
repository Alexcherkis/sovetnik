const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://buro-sovetnik.com';
const distDir = path.join(process.cwd(), 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const lastmod = new Date().toISOString().split('T')[0];

const staticRoutes = [
  '',
  '/about',
  '/contacts',
  '/faq',
  '/price',
  '/blog',
  '/privacy',
  '/terms',
  '/team',
  '/reviews'
];

const serviceCategories = [
  'financial', 'construction', 'valuation', 'land', 'handwriting', 'legal', 'intellectual_property', 'reviews'
];

const services = [
  // Financial
  'financial-economic', 'accounting', 'tax-expertise', 'financial-calc', 'bankruptcy', 'damage-financial', 'corporate-finance', 'investment',
  // Construction
  'pre-trial-construction', 'construction-volumes', 'forensic-construction', 'construction-general', 'damage', 'construction-organization', 'construction-engineering', 'construction-elements', 'construction-road', 'construction-wooden',
  // Valuation
  'business-valuation-llc', 'startup-valuation', 'trademark-valuation', 'patent-valuation', 'software-valuation', 'knowhow-valuation', 'apartment-valuation', 'commercial-valuation', 'land-valuation',
  // Land
  'land-surveying', 'land-partition',
  // Handwriting
  'handwriting', 'doc-technical',
  // Reviews
  'forensic-review',
  // Legal
  'legal-support', 'legal-arbitration',
  // Construction (additional)
  'construction-project-docs',
  // SEO Specialized Services
  'water-damage-court', 'road-volume-expertise', 'estimate-verification',
  'equipment-valuation', 'project-docs-audit', 'dtp-review'
];

const cities = [
  'ufa', 'moscow', 'kazan', 'ekaterinburg', 'spb', 'samara', 'krasnodar',
  'sochi', 'tyumen', 'chelyabinsk', 'novosibirsk', 'omsk', 'surgut', 'orenburg',
  'krasnogorsk', 'odintsovo', 'mytishchi', 'khimki', 'balashikha', 'korolev', 'podolsk', 'lyubertsy',
  'nizhny-novgorod', 'rostov-on-don', 'voronezh', 'volgograd', 'izhevsk', 'ulyanovsk', 'barnaul', 'irkutsk', 'makhachkala', 'tomsk', 'kemerovo'
];

const blogPosts = [
  'subsidiary-liability-protection',
  'construction-defects-new-building',
  'business-valuation-divorce',
  'real-case-withdrawal',
  'challenging-cadastral-value',
  'sudebnaya-vs-dosudebnaya',
  'how-to-cancel-expert-decision',
  'estimate-audit-savings'
];

function generateSitemap(urls, fileName) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  urls.forEach(url => {
    xml += `\n  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${url.lastmod || lastmod}</lastmod>\n    <changefreq>${url.changefreq || 'weekly'}</changefreq>\n    <priority>${url.priority || '0.8'}</priority>\n  </url>`;
  });

  xml += `\n</urlset>`;

  fs.writeFileSync(path.join(distDir, fileName), xml);
  console.log(`✅ Generated ${fileName} with ${urls.length} URLs`);
}

// 1. Core sitemap (static routes, categories, blog posts)
const coreUrls = [
  ...staticRoutes.map(route => ({ 
    loc: `${SITE_URL}${route}`, 
    priority: route === '' ? '1.0' : '0.8',
    changefreq: route === '' ? 'daily' : 'weekly'
  })),
  ...serviceCategories.map(cat => ({ 
    loc: `${SITE_URL}/services/category/${cat}`, 
    priority: '0.9',
    changefreq: 'weekly'
  })),
  ...blogPosts.map(post => ({ 
    loc: `${SITE_URL}/blog/${post}`, 
    priority: '0.6',
    changefreq: 'monthly'
  }))
];

// 2. PSEO sitemap (city-specific service and category pages)
const pseoUrls = [
  ...services.map(service => ({ 
    loc: `${SITE_URL}/services/${service}`, 
    priority: '0.9',
    changefreq: 'weekly'
  })),
  ...services.flatMap(service => 
    cities.map(city => ({ 
      loc: `${SITE_URL}/services/${service}/${city}`, 
      priority: '0.7',
      changefreq: 'monthly'
    }))
  ),
  ...serviceCategories.flatMap(cat => 
    cities.map(city => ({ 
      loc: `${SITE_URL}/services/category/${cat}/${city}`, 
      priority: '0.7',
      changefreq: 'monthly'
    }))
  )
];

// Generate sitemaps
try {
  generateSitemap(coreUrls, 'sitemap-core.xml');
  generateSitemap(pseoUrls, 'sitemap-pseo.xml');

  // 3. Sitemap Index
  let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  indexXml += `\n  <sitemap>\n    <loc>${SITE_URL}/sitemap-core.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`;
  indexXml += `\n  <sitemap>\n    <loc>${SITE_URL}/sitemap-pseo.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`;
  indexXml += `\n</sitemapindex>`;

  fs.writeFileSync(path.join(distDir, 'sitemap-index.xml'), indexXml);
  console.log(`✅ Generated sitemap-index.xml`);

  // 4. Also generate a general sitemap.xml (backwards compatibility)
  const allUrls = [...coreUrls, ...pseoUrls];
  generateSitemap(allUrls, 'sitemap.xml');

  console.log(`\n🎉 All sitemaps generated successfully!`);
  console.log(`📊 Total URLs: ${allUrls.length}`);
} catch (e) {
  console.error('❌ Error generating sitemaps:', e);
  process.exit(1);
}
