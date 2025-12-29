import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
    name: string;
    item: string;
}

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    breadcrumbs?: BreadcrumbItem[];
    schema?: Record<string, any> | Record<string, any>[]; // Support for custom schema injection
}

export const SEO: React.FC<SEOProps> = ({ title, description, keywords, breadcrumbs, schema }) => {
    const siteTitle = "Советникъ — Экспертное Бюро";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    // Generate BreadcrumbList JSON-LD
    const breadcrumbSchema = breadcrumbs ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": crumb.item.startsWith('http') ? crumb.item : `https://buro-sovetnik.com${crumb.item}`
        }))
    } : null;

    return (
        <Helmet>
            {title && <title>{fullTitle}</title>}
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}
            {title && <meta property="og:title" content={fullTitle} />}
            {description && <meta property="og:description" content={description} />}

            {/* Favicons (Self-referencing for robustness) */}
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="apple-touch-icon" href="/favicon.svg" />

            {/* JSON-LD Schemas */}
            {breadcrumbSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}

            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};
