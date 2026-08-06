import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const isClone = mode === 'clone';

  const cloneOrigin = 'https://sovetnik-cno.ru';
  const cloneHost = cloneOrigin.replace('https://', '').replace('http://', '');

  const robotsTxt = isClone
    ? [
        'User-agent: *',
        'Disallow: /',
        `Host: ${cloneHost}`
      ].join('\n')
    : [
        'User-agent: *',
        'Allow: /',
        'Host: buro-sovetnik.com',
        'Crawl-delay: 5',
        'Sitemap: https://buro-sovetnik.com/sitemap-index.xml',
        'Sitemap: https://buro-sovetnik.com/sitemap-core.xml',
        'Sitemap: https://buro-sovetnik.com/sitemap-pseo.xml',
        '',
        '# AI crawlers — allowed for better AI-generated answers',
        'User-agent: GPTBot',
        'Allow: /',
        '',
        'User-agent: OAI-SearchBot',
        'Allow: /',
        '',
        'User-agent: PerplexityBot',
        'Allow: /',
        '',
        'User-agent: ClaudeBot',
        'Allow: /',
        '',
        'User-agent: CCBot',
        'Allow: /',
        '',
        'User-agent: Google-Extended',
        'Allow: /',
        '',
        '# Disallow tracking parameters',
        'Disallow: /*?utm_',
        'Disallow: /*?yclid=',
        'Disallow: /*?gclid=',
        '',
        '# Disallow non-content directories',
        'Disallow: /tmp_logos/',
        'Disallow: /favicon_options/'
      ].join('\n');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/send-form.php': {
          target: 'https://buro-sovetnik.com',
          changeOrigin: true,
          secure: false,
          headers: {
            'Origin': 'http://localhost:3000'
          }
        }
      }
    },
    plugins: [
      react(),
      {
        name: 'browser-logger',
        configureServer(server) {
          server.middlewares.use('/api/log', (req, res) => {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
              try {
                const log = JSON.parse(body);
                console.log(`\n🚨 [BROWSER ${log.type.toUpperCase()}] ${log.message}`);
                if (log.stack) console.log(`Stack: ${log.stack}\n`);
              } catch (e) {}
              res.statusCode = 200;
              res.end('ok');
            });
          });
        }
      },
      {
        name: 'robots-per-mode',
        apply: 'build',
        closeBundle() {
          try {
            const distDir = path.join(process.cwd(), 'dist');
            fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt);

            // For clone builds we must not leak main-domain sitemap links.
            if (isClone) {
              const today = new Date().toISOString().slice(0, 10);
              const minimalUrlset = [
                '<?xml version="1.0" encoding="UTF-8"?>',
                '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                '  <url>',
                `    <loc>${cloneOrigin}/</loc>`,
                `    <lastmod>${today}</lastmod>`,
                '  </url>',
                '</urlset>',
                ''
              ].join('\n');

              // Overwrite any copied public sitemaps with minimal clone-safe versions.
              for (const f of ['sitemap.xml', 'sitemap-index.xml', 'sitemap-core.xml', 'sitemap-pseo.xml']) {
                try {
                  fs.writeFileSync(path.join(distDir, f), minimalUrlset);
                } catch {
                  // ignore
                }
              }
            }
          } catch (e) {
            // ignore
          }
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    build: {
      // In clone mode we prefer stability over bundle size.
      // Some minified builds can trigger TDZ errors in certain environments.
      minify: isClone ? false : 'esbuild',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            ui: ['lucide-react'],
            utils: ['fuse.js']
          }
        }
      }
    }
  };
});
