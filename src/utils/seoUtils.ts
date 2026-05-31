/**
 * Утилиты для динамической генерации SEO-контента (Spinning).
 * Создают уникальные мета-теги для тысяч PSEO страниц, чтобы избежать санкций Google за дубликаты.
 */

const TITLE_TEMPLATES = [
    "{service} {cityIn} — Судебная экспертиза и оценка. Цена от {price}",
    "Независимая {service} {cityIn} | Экспертный центр",
    "{service} {cityIn}: заказать экспертизу для суда. Сроки от {duration}",
    "Профессиональная {service} {cityIn} — Заключение по ФЗ-73",
    "{service} {cityIn}. Экспертный центр (опыт 15 лет)"
];

const DESC_TEMPLATES = [
    "Проведем независимую {serviceLower} {cityIn} и по всей РФ. Официальное заключение экспертов (ФЗ-73) для суда. Сроки от {duration}. Бесплатная консультация по телефону.",
    "Закажите услугу «{service}» {cityIn} в федеральном бюро экспертиз. Опытные эксперты, аккредитация во всех судах. Гарантия защиты заключения в суде.",
    "{service} {cityIn}: профессиональная помощь в сложных спорах. Сжатые сроки от {duration}, доступные цены от {price}. Работаем с 2011 года.",
    "Нужна {serviceLower} {cityIn}? Экспертный центр подготовит легитимное заключение для судов любой инстанции. Соблюдение всех методик и ФСО.",
    "Экспертиза и оценка «{service}» {cityIn}. Высокая точность, современное оборудование, защита в суде и ФНС. Консультация эксперта бесплатно!"
];

/**
 * Генерирует уникальный индекс на основе строки (slug), 
 * чтобы для одной страницы всегда был один и тот же "вариант" текста.
 */
const getDeterministicHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
};

export const getDynamicSEO = (serviceTitle: string, cityIn: string, price: string, duration: string, slug: string) => {
    const hash = getDeterministicHash(slug + cityIn);
    
    // Выбираем шаблон на основе хеша
    const titleTpl = TITLE_TEMPLATES[hash % TITLE_TEMPLATES.length];
    const descTpl = DESC_TEMPLATES[hash % DESC_TEMPLATES.length];

    const replaceTags = (text: string) => {
        return text
            .replace(/{service}/g, serviceTitle)
            .replace(/{serviceLower}/g, serviceTitle.toLowerCase())
            .replace(/{cityIn}/g, cityIn)
            .replace(/{price}/g, price)
            .replace(/{duration}/g, duration);
    };

    return {
        title: replaceTags(titleTpl),
        description: replaceTags(descTpl)
    };
};
