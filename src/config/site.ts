import globalData from '../content/settings/global.json';

const getEnv = (key: string, fallback: string) => {
  const v = (import.meta.env as any)[key];
  return typeof v === 'string' && v.length > 0 ? v : fallback;
};

// Site Information
export const SITE_ORIGIN = globalData.site_origin || getEnv('VITE_SITE_ORIGIN', 'https://buro-sovetnik.com');
export const SITE_NAME = globalData.site_name || getEnv('VITE_SITE_NAME', 'Советникъ — Экспертное Бюро');

// Contacts
export const CONTACT_PHONE_DISPLAY = globalData.contact_phone_display || getEnv('VITE_CONTACT_PHONE', '+7 (987) 022-49-99');
export const CONTACT_PHONE_E164 = globalData.contact_phone_e164 || getEnv('VITE_CONTACT_PHONE_E164', '+79870224999');
export const CONTACT_EMAIL = globalData.contact_email || getEnv('VITE_CONTACT_EMAIL', 'expert-sovetnik-rf@ya.ru');

// Address
export const CONTACT_ADDRESS_STREET = globalData.contact_address_street || getEnv('VITE_CONTACT_ADDRESS_STREET', 'Лесной пр-д, д. 8/3');
export const CONTACT_ADDRESS_CITY = globalData.contact_address_city || getEnv('VITE_CONTACT_ADDRESS_CITY', 'Уфа');
export const CONTACT_ADDRESS_POSTAL = globalData.contact_address_postal || getEnv('VITE_CONTACT_ADDRESS_POSTAL', '450071');
export const CONTACT_ADDRESS_COUNTRY = globalData.contact_address_country || getEnv('VITE_CONTACT_ADDRESS_COUNTRY', 'RU');
export const CONTACT_MAP_URL = globalData.contact_map_url || getEnv('VITE_CONTACT_MAP_URL', '');

// Social
export const SOCIAL_TELEGRAM_URL = globalData.social_telegram_url || getEnv('VITE_SOCIAL_TELEGRAM_URL', 'https://t.me/sovetnik_buro');
export const SOCIAL_VK_URL = globalData.social_vk_url || getEnv('VITE_SOCIAL_VK_URL', 'https://vk.com/sovetnik_buro');
export const SOCIAL_WHATSAPP_URL = globalData.social_whatsapp_url || getEnv('VITE_SOCIAL_WHATSAPP_URL', '');

// Legal
export const COMPANY_LEGAL_NAME = globalData.company_legal_name || getEnv('VITE_COMPANY_LEGAL_NAME', 'ООО «ЭБ СОВЕТНИК»');
export const COMPANY_INN = globalData.company_inn || getEnv('VITE_COMPANY_INN', '0274131774');
export const COMPANY_OGRN = globalData.company_ogrn || getEnv('VITE_COMPANY_OGRN', '1080274006988');

// External Links
export const YANDEX_BUSINESS_URL = globalData.yandex_business_url || getEnv('VITE_YANDEX_BUSINESS_URL', 'https://yandex.ru/maps/org/sovetnik/');
export const G2GIS_URL = globalData.g2gis_url || getEnv('VITE_G2GIS_URL', 'https://2gis.ru/ufa/firm/');

// Internal config (not in CMS)
export const INDEXABLE = getEnv('VITE_INDEXABLE', 'true') !== 'false';
export const ANALYTICS_ENABLED = getEnv('VITE_ANALYTICS_ENABLED', 'true') !== 'false';
export const LOGO_URL = getEnv('VITE_LOGO_URL', `${SITE_ORIGIN}/favicon.svg`);
export const OG_IMAGE_URL = getEnv('VITE_OG_IMAGE_URL', `${SITE_ORIGIN}/og-image.webp`);
export const PROFI_URL = getEnv('VITE_PROFI_URL', '');
export const FLAMP_URL = getEnv('VITE_FLAMP_URL', '');
