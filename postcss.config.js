export default {
    plugins: {
        tailwindcss: process.env.TAILWIND_CONFIG
            ? { config: process.env.TAILWIND_CONFIG }
            : {},
        autoprefixer: {},
    },
}
