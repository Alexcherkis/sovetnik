import frontMatter from 'front-matter';
import type { BlogPost } from '../types';

import forensicImg from '../assets/images/blog/forensic.webp';
import roadConstructionExpertImg from '../assets/images/road_construction_expert_1771709915978.webp';
import financeLegalImg from '../assets/images/finance_legal.webp';
import constructionSurveyingImg from '../assets/images/construction_surveying.webp';
import valuationBusinessImg from '../assets/images/valuation_business.webp';
import constructionTechImg from '../assets/images/construction_tech.webp';
import cadastralImg from '../assets/images/blog/cadastral.webp';
import financeAuditImg from '../assets/images/finance_audit.webp';
import valuationLandImg from '../assets/images/valuation_land.webp';
import constructionEstimateExpertImg from '../assets/images/construction_estimate_expert_1771709934929.webp';

// We fallback to forensicImg if image isn't found
const imageMap: Record<string, string> = {
  scaleImg: forensicImg,
  justiceScaleImg: forensicImg,
  forensicImg,
  roadConstructionExpertImg,
  financeLegalImg,
  constructionSurveyingImg,
  valuationBusinessImg,
  constructionTechImg,
  cadastralImg,
  financeAuditImg,
  valuationLandImg,
  constructionEstimateExpertImg
};

const mdFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

export const getBlogPosts = (): BlogPost[] => {
  const posts: BlogPost[] = Object.keys(mdFiles).map((path, index) => {
    const rawContent = mdFiles[path] as string;
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    
    const { attributes, body } = frontMatter<any>(rawContent);
    
    return {
      id: index + 1,
      slug,
      title: attributes.title || '',
      excerpt: attributes.excerpt || '',
      date: attributes.date || '',
      datePublished: attributes.datePublished || attributes.date || '',
      dateModified: attributes.dateModified || attributes.date || '',
      category: attributes.category || '',
      readTime: attributes.readTime || '',
      image: imageMap[attributes.image] || attributes.image || forensicImg,
      content: body as unknown as React.ReactNode
    };
  });

  return posts;
};

export const BLOG_POSTS_DYNAMIC = getBlogPosts();
