import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'profile';
    schema?: Record<string, any>;
}

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop";
const SITE_URL = "https://sovetnik-expert.ru"; // Update if using a different domain
const SITE_NAME = "Советникъ — Экспертное Бюро";

export const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    image = DEFAULT_IMAGE,
    url = SITE_URL,
    type = 'website',
    schema
}) => {
    const fullTitle = `${title} | Советникъ`;
    const absoluteUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;

    // Default Organization Schema (JSON-LD)
    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Экспертное Бюро Советникъ",
        "image": DEFAULT_IMAGE,
        "url": SITE_URL,
        "telephone": "+79991234567",
        "email": "info@sovetnik-expert.ru",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Москва",
            "streetAddress": "ЖК «Статус», 20 этаж, офис 157"
        },
        "priceRange": "₽₽",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        }
    };

    const structuredData = schema ? { ...defaultSchema, ...schema } : defaultSchema;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={absoluteUrl} />

            {/* Open Graph (Facebook / WhatsApp / Telegram) */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={absoluteUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};
