import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface NavItem {
  label: string;
  path: string;
  subItems?: NavItem[];
  isHeader?: boolean;
}

export type CategorySlug = 'financial' | 'construction' | 'valuation' | 'land' | 'handwriting' | 'legal' | 'auto' | 'intellectual_property' | 'reviews';

export interface ServiceCategoryData {
  slug: CategorySlug;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  icon: LucideIcon;
  benefits: { title: string; desc: string }[];
  process?: { title: string; desc: string; icon?: LucideIcon }[];
  definition?: string;
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  priceStart: string;
  duration: string;
  icon: LucideIcon;
  slug: string;
  categorySlug: CategorySlug; // CHANGED: Linked to strict types
  categoryLabel: string; // Display name
  region: 'РФ' | 'Башкортостан';
  longDescription?: ReactNode;
  tasks: string[];
  questions: string[];
  documents: string[];
  heroImage?: string;
  authorSlug?: string;
  dateModified?: string;
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQGroup {
  title: string;
  items: FAQItem[];
}

export interface PriceRow {
  service: string;
  price: string;
  time: string;
  note: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  datePublished?: string;
  dateModified?: string;
  category: string;
  image: string;
  readTime: string;
  content: ReactNode;
}

export interface TeamMember {
  name: string;
  role: string;
  experience: string;
  image: string;
}