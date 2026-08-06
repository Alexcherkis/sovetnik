import React from 'react';
import { Helmet } from 'react-helmet-async';
import { GOOGLE_SEARCH_CONSOLE_CODE } from '../config/analytics';
import {
    INDEXABLE,
    SITE_NAME,
    SITE_ORIGIN,
    CONTACT_PHONE_DISPLAY as CONTACT_PHONE,
    CONTACT_PHONE_E164,
    LOGO_URL,
    OG_IMAGE_URL,
    CONTACT_EMAIL,
    CONTACT_ADDRESS_STREET,
    CONTACT_ADDRESS_CITY,
    CONTACT_ADDRESS_POSTAL,
    CONTACT_ADDRESS_COUNTRY,
    SOCIAL_TELEGRAM_URL,
    SOCIAL_VK_URL,
    YANDEX_BUSINESS_URL,
    G2GIS_URL,
    COMPANY_LEGAL_NAME,
    COMPANY_INN,
    COMPANY_OGRN
} from '../config/site';
import { REVIEWS } from '../data/constants';

interface BreadcrumbItem {
    name: string;
    item: string;
}

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    breadcrumbs?: BreadcrumbItem[];
    schema?: Record<string, any> | Record<string, any>[];
    noindex?: boolean;
    city?: string;
    currentCityAddress?: string;
    service?: {
        name: string;
        description: string;
        price: string;
        duration: string;
        category: string;
    };
    author?: {
        name: string;
        url?: string;
        honorific?: string;
    };
    datePublished?: string;
    dateModified?: string;
}

// Автоопределение текущего URL для canonical, если пропущен
const getCurrentPath = (): string => {
    if (typeof window !== 'undefined') {
        return window.location.pathname;
    }
    return '/';
};

export const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    image = OG_IMAGE_URL,
    url,
    type = 'website',
    breadcrumbs,
    schema,
    noindex = false,
    city,
    currentCityAddress,
    service,
    author,
    datePublished,
    dateModified
}) => {
    const siteTitle = SITE_NAME;
    const fullTitle = title ? title : siteTitle;
    const metaDescription = description || `Профессиональная независимая экспертиза в ${siteTitle}. Судебные и внесудебные исследования: строительные, финансовые, экономические, почерковедческие. Официальные заключения по ФЗ-73 для судов РФ. Работаем более 15 лет.`;
    const ENABLE_AGGREGATE_RATING = (import.meta.env.VITE_ENABLE_AGGREGATE_RATING ?? 'true') !== 'false';
    
    const normalizeToAbsoluteUrl = (value: string) => {
        if (!value) return SITE_ORIGIN + '/';
        if (value.startsWith('http://') || value.startsWith('https://')) return value;
        const path = value.startsWith('/') ? value : `/${value}`;
        return `${SITE_ORIGIN}${path}`;
    };

    const resolvedUrl = url ?? getCurrentPath();
    const canonicalUrl = normalizeToAbsoluteUrl(resolvedUrl);
    const cityInText = city ? `в ${city}` : 'в РФ';

    // --- PREMIUM SEO: Dynamic LocalBusiness / ProfessionalService ---
    const serviceName = city ? `${siteTitle} в ${city}` : siteTitle;
    const realReviews = REVIEWS || [];
    const totalRating = realReviews.reduce((sum, r) => sum + Number(r.rating), 0);
    const realRating = realReviews.length > 0 ? (totalRating / realReviews.length).toFixed(1) : "5.0";
    const ratingValue = realRating;
    const reviewCount = realReviews.length;

    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${canonicalUrl}#identity`,
        "name": serviceName,
        "alternateName": siteTitle,
        "legalName": COMPANY_LEGAL_NAME,
        "taxID": COMPANY_INN,
        ...(COMPANY_OGRN ? { "leiCode": COMPANY_OGRN } : {}),
        "image": OG_IMAGE_URL,
        "url": canonicalUrl,
        "logo": LOGO_URL,
        "telephone": CONTACT_PHONE_E164,
        "email": CONTACT_EMAIL,
        "foundingDate": "2010",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 5, "maxValue": 15 },
        "address": {
            "@type": "PostalAddress",
            ...(city ? {
                "addressLocality": city,
                "addressCountry": CONTACT_ADDRESS_COUNTRY,
                ...(currentCityAddress ? { "streetAddress": currentCityAddress } : {})
            } : {
                "streetAddress": CONTACT_ADDRESS_STREET,
                "addressLocality": CONTACT_ADDRESS_CITY,
                "postalCode": CONTACT_ADDRESS_POSTAL,
                "addressCountry": CONTACT_ADDRESS_COUNTRY
            })
        },
        ...(!city ? {
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 54.750645,
                "longitude": 56.015079
            }
        } : {}),
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "20:00"
        },
        "areaServed": [
            { "@type": "City", "name": city || CONTACT_ADDRESS_CITY || "РФ" },
            { "@type": "Country", "name": "Россия" }
        ],
        "priceRange": "40000-500000RUB",
        "knowsAbout": [
            { "@type": "Thing", "name": "Судебная экспертиза" },
            { "@type": "Thing", "name": "Строительная экспертиза" },
            { "@type": "Thing", "name": "Финансовая экспертиза" },
            { "@type": "Thing", "name": "Оценка бизнеса" },
            { "@type": "Thing", "name": "Почерковедческая экспертиза" }
        ],
        "hasCredential": [
            { "@type": "EducationalOccupationalCredential", "credentialCategory": "СРО", "name": "Членство в СРО оценщиков" },
            { "@type": "EducationalOccupationalCredential", "credentialCategory": "ГОСТ", "name": "Соответствие ФЗ-73" }
        ],
        ...(ENABLE_AGGREGATE_RATING ? {
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": ratingValue,
                "reviewCount": reviewCount.toString(),
                "bestRating": "5"
            }
        } : {}),
        "sameAs": [
            SOCIAL_TELEGRAM_URL,
            SOCIAL_VK_URL,
            YANDEX_BUSINESS_URL,
            G2GIS_URL
        ].filter(Boolean)
    };

    // --- REVIEW SCHEMA from REVIEWS ---
    const reviewSchema = REVIEWS.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": siteTitle,
        "review": REVIEWS.map(review => ({
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": review.author
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating,
                "bestRating": "5"
            },
            "reviewBody": review.text,
            "datePublished": new Date().toISOString().split('T')[0]
        })),
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": REVIEWS.length.toString(),
            "bestRating": "5"
        }
    } : null;

    // Generate BreadcrumbList JSON-LD
    const breadcrumbSchema = breadcrumbs ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": normalizeToAbsoluteUrl(crumb.item)
        }))
    } : null;

    // Combine schemas
    const schemaList: Record<string, any>[] = [defaultSchema];
    if (reviewSchema) schemaList.push(reviewSchema);
    if (breadcrumbSchema) schemaList.push(breadcrumbSchema);
    
    if (author) {
        schemaList.push({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${canonicalUrl}#author`,
            "name": author.name,
            "honorificSuffix": author.honorific || undefined,
            "url": author.url || undefined,
            "description": `Эксперт ${siteTitle}`
        });
        // Link defaultSchema to author
        schemaList[0].author = { "@id": `${canonicalUrl}#author` };
    }
    
    if (schema) {
        if (Array.isArray(schema)) {
            schemaList.push(...schema);
        } else {
            schemaList.push(schema);
        }
    }

    // --- ENHANCED SERVICE/PRODUCT SCHEMA FOR SNIPPETS ---
    if (service) {
        schemaList.push({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": `${service.name} ${cityInText}`,
            "description": service.description,
            "category": service.category,
            "brand": {
                "@type": "Brand",
                "name": siteTitle
            },
            "offers": {
                "@type": "Offer",
                "priceCurrency": "RUB",
                "price": service.price.replace(/[^0-9]/g, ''),
                "availability": "https://schema.org/InStock",
                "url": canonicalUrl,
                "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
            }
        });
    } else if (fullTitle.includes('Рецензия') || fullTitle.includes('Товарный') || fullTitle.includes('Патент')) {
        schemaList.push({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": fullTitle,
            "description": metaDescription,
            "provider": {
                "@type": "ProfessionalService",
                "name": siteTitle,
                "address": defaultSchema.address
            },
            ...(ENABLE_AGGREGATE_RATING && (defaultSchema as any).aggregateRating ? { "aggregateRating": (defaultSchema as any).aggregateRating } : {}),
            "offers": {
                "@type": "Offer",
                "priceCurrency": "RUB",
                "price": "25000",
                "availability": "https://schema.org/InStock"
            }
        });
    }

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={keywords || "судебная экспертиза, строительная экспертиза, финансовая экспертиза, оценка бизнеса, независимая экспертиза, фз-73, экспертное бюро"} />

            {/* Geo Tags for Local SEO */}
            {!city && (
                <>
                    <meta name="geo.region" content="RU-BA" />
                    <meta name="geo.placename" content={CONTACT_ADDRESS_CITY || "Уфа"} />
                    <meta name="ICBM" content="54.750645, 56.015079" />
                </>
            )}
            {city && (
                <>
                    <meta name="geo.placename" content={city} />
                </>
            )}

            {/* Additional SEO Meta Tags */}
            <meta name="author" content={siteTitle} />
            <meta name="copyright" content={`© ${new Date().getFullYear()} ${siteTitle}`} />
            <meta name="dateModified" content={dateModified || new Date().toISOString().split('T')[0]} />
            <meta name="datePublished" content={datePublished || `${new Date().getFullYear()}-01-01`} />
            <meta name="theme-color" content="#0B1221" />
            <meta name="format-detection" content="telephone=yes" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

            {/* Canonical Link */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Hreflang Tags */}
            <link rel="alternate" href={canonicalUrl} hrefLang="ru" />
            <link rel="alternate" href={canonicalUrl} hrefLang="x-default" />

            {/* Robots Control */}
            {(!INDEXABLE || noindex) && <meta name="robots" content="noindex, nofollow" />}

            {/* Google Search Console Verification */}
            {GOOGLE_SEARCH_CONSOLE_CODE && (
                <meta name="google-site-verification" content={GOOGLE_SEARCH_CONSOLE_CODE.replace('google-site-verification=', '')} />
            )}

            {/* Open Graph / Facebook / Yandex Snippets */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:locale" content="ru_RU" />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:phone_number" content={CONTACT_PHONE_E164} />
            <meta property="og:email" content={CONTACT_EMAIL} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD Schemas */}
            <script type="application/ld+json">
                {JSON.stringify(schemaList)}
            </script>
        </Helmet>
    );
};
