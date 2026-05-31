export interface Author {
    slug: string;
    name: string;
    honorific: string;
    role: string;
    description: string;
    avatar?: string;
    expertise: string[];
    education: string;
    experience: string;
    certs: string[];
    phone?: string;
    email?: string;
}

export const AUTHORS: Author[] = [
    {
        slug: "alexey-grigoriev",
        name: "Алексей Григорьев",
        honorific: "К.Э.Н.",
        role: "Ведущий эксперт-оценщик",
        description: "Кандидат экономических наук. Специализация: оценка бизнеса, интеллектуальной собственности, финансово-экономическая экспертиза. Стаж экспертной работы более 15 лет.",
        expertise: ["Оценка бизнеса", "Финансовая экспертиза", "Оценка НМА", "Судебная экспертиза"],
        education: "Высшее экономическое, аспирантура. Кандидат экономических наук.",
        experience: "Более 15 лет",
        certs: ["Член СРО оценщиков", "Сертификат ФСО-8"]
    },
    {
        slug: "sergey-petrov",
        name: "Сергей Петров",
        honorific: "Эксперт",
        role: "Строительный эксперт",
        description: "Специалист по строительно-технической экспертизе, обследованию зданий и сооружений. Опыт работы в строительном контроле более 12 лет.",
        expertise: ["Строительная экспертиза", "Техническое обследование", "Проектная экспертиза"],
        education: "Высшее строительное, УГНТУ.",
        experience: "Более 12 лет",
        certs: ["Свидетельство НОПРИЗ", "Сертификат по промбезопасности"]
    },
    {
        slug: "elena-smirnova",
        name: "Елена Смирнова",
        honorific: "Эксперт",
        role: "Бухгалтер-эксперт",
        description: "Судебный бухгалтер-эксперт. Восстановление учета, анализ хищений, бухгалтерская и налоговая экспертиза. Более 10 лет практики.",
        expertise: ["Бухгалтерская экспертиза", "Налоговая экспертиза", "Финансовый анализ"],
        education: "Высшее экономическое, диплом Минфина.",
        experience: "Более 10 лет",
        certs: ["Аттестат профессионального бухгалтера", "Член ИПБ России"]
    },
    {
        slug: "dmitry-volkov",
        name: "Дмитрий Волков",
        honorific: "К.Ю.Н.",
        role: "Юрист-эксперт",
        description: "Кандидат юридических наук. Специализация: арбитражные споры, банкротство, субсидиарная ответственность, судебное представительство.",
        expertise: ["Арбитраж", "Банкротство", "Субсидиарная ответственность", "Юридический консалтинг"],
        education: "Высшее юридическое, МГУ. Кандидат юридических наук.",
        experience: "Более 14 лет",
        certs: ["Статус адвоката", "Член АП РФ"]
    }
];

export function getAuthorBySlug(slug: string): Author | undefined {
    return AUTHORS.find(a => a.slug === slug);
}

const CATEGORY_AUTHOR_MAP: Record<string, string> = {
    'financial': 'elena-smirnova',
    'construction': 'sergey-petrov',
    'valuation': 'alexey-grigoriev',
    'land': 'sergey-petrov',
    'handwriting': 'elena-smirnova',
    'legal': 'dmitry-volkov',
    'reviews': 'alexey-grigoriev',
    'intellectual_property': 'alexey-grigoriev',
    'auto': 'sergey-petrov',
};

export function getAuthorForCategory(categorySlug: string): Author | undefined {
    const slug = CATEGORY_AUTHOR_MAP[categorySlug] || 'alexey-grigoriev';
    return getAuthorBySlug(slug);
}

export function getAuthorForService(service: { categorySlug: string }): Author | undefined {
    return getAuthorForCategory(service.categorySlug);
}
