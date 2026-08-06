import fs from 'fs';

const content = fs.readFileSync('src/data/constants.tsx', 'utf-8');
const startStr = 'export const BLOG_POSTS: BlogPost[] = [';
const start = content.indexOf(startStr) + startStr.length;
const end = content.indexOf('];', start);
const sub = content.substring(start, end);

const blocks = sub.split(/(?=\b\s*id:\s*\d+)/);
blocks.forEach(block => {
  const matchSlug = block.match(/slug:\s*["']([^"']+)/);
  if (!matchSlug) return;
  const slug = matchSlug[1];

  const getVal = (key) => {
    const r = new RegExp(key + ':\\s*(["\'])([\\s\\S]*?)\\1', 's');
    const m = block.match(r);
    return m ? m[2].trim() : '';
  };
  
  const title = getVal('title').replace(/"/g, '\\"');
  const excerpt = getVal('excerpt').replace(/"/g, '\\"');
  const date = getVal('date');
  const datePublished = getVal('datePublished') || date;
  const dateModified = getVal('dateModified') || date;
  const category = getVal('category');
  const readTime = getVal('readTime');

  let imageMatch = block.match(/image:\s*([a-zA-Z0-9_]+)/);
  let image = imageMatch ? imageMatch[1] : '';

  let contentMatch = block.match(/content:\s*\([\s\S]*?<>\s*([\s\S]*?)\s*<\/>\s*\)/);
  let body = contentMatch ? contentMatch[1] : '';
  body = body.replace(/className=/g, 'class=');
  body = body.trim();
  
  const out = '---\n' +
    'title: "' + title + '"\n' +
    'excerpt: "' + excerpt + '"\n' +
    'date: "' + date + '"\n' +
    'datePublished: "' + datePublished + '"\n' +
    'dateModified: "' + dateModified + '"\n' +
    'category: "' + category + '"\n' +
    'readTime: "' + readTime + '"\n' +
    'image: "' + image + '"\n' +
    '---\n\n' + body + '\n';
    
  fs.writeFileSync('src/content/blog/' + slug + '.md', out);
  console.log('Written', slug);
});
