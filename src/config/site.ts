const getEnv = (key: string, fallback: string) => {
  const v = (import.meta.env as any)[key];
  return typeof v === 'string' && v.length > 0 ? v : fallback;
};

export const SITE_ORIGIN = getEnv('VITE_SITE_ORIGIN', 'https://buro-sovetnik.com');
export const SITE_NAME = getEnv('VITE_SITE_NAME', 'Советникъ — Экспертное Бюро');

export const CONTACT_PHONE_DISPLAY = getEnv('VITE_CONTACT_PHONE', '+7 (987) 022-49-99');
export const CONTACT_PHONE_E164 = getEnv('VITE_CONTACT_PHONE_E164', '+79870224999');
export const CONTACT_EMAIL = getEnv('VITE_CONTACT_EMAIL', 'expert-sovetnik-rf@ya.ru');

export const INDEXABLE = getEnv('VITE_INDEXABLE', 'true') !== 'false';
export const ANALYTICS_ENABLED = getEnv('VITE_ANALYTICS_ENABLED', 'true') !== 'false';

export const LOGO_URL = getEnv('VITE_LOGO_URL', `${SITE_ORIGIN}/favicon.svg`);
export const OG_IMAGE_URL = getEnv('VITE_OG_IMAGE_URL', `${SITE_ORIGIN}/og-image.webp`);

export const CONTACT_ADDRESS_STREET = getEnv('VITE_CONTACT_ADDRESS_STREET', 'ул. 50 лет СССР, 34');
export const CONTACT_ADDRESS_CITY = getEnv('VITE_CONTACT_ADDRESS_CITY', 'Уфа');
export const CONTACT_ADDRESS_POSTAL = getEnv('VITE_CONTACT_ADDRESS_POSTAL', '450000');
export const CONTACT_ADDRESS_COUNTRY = getEnv('VITE_CONTACT_ADDRESS_COUNTRY', 'RU');
export const CONTACT_MAP_URL = getEnv('VITE_CONTACT_MAP_URL', '');

export const SOCIAL_TELEGRAM_URL = getEnv('VITE_SOCIAL_TELEGRAM_URL', 'https://t.me/sovetnik_buro');
export const SOCIAL_VK_URL = getEnv('VITE_SOCIAL_VK_URL', 'https://vk.com/sovetnik_buro');
export const SOCIAL_WHATSAPP_URL = getEnv('VITE_SOCIAL_WHATSAPP_URL', '');

export const COMPANY_LEGAL_NAME = getEnv('VITE_COMPANY_LEGAL_NAME', 'ООО «ЭБ СОВЕТНИК»');
export const COMPANY_INN = getEnv('VITE_COMPANY_INN', '0274131774');
export const COMPANY_OGRN = getEnv('VITE_COMPANY_OGRN', '1080274006988');

// External platforms for E-E-A-T and citation authority
export const YANDEX_BUSINESS_URL = getEnv('VITE_YANDEX_BUSINESS_URL', 'https://yandex.ru/maps/org/sovetnik/');
export const G2GIS_URL = getEnv('VITE_G2GIS_URL', 'https://2gis.ru/ufa/firm/');
export const PROFI_URL = getEnv('VITE_PROFI_URL', '');
export const FLAMP_URL = getEnv('VITE_FLAMP_URL', '');

