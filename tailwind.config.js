/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
        "!./node_modules/**"
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1.5rem',
                md: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
                '3xl': '8rem',
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
                '3xl': '1800px',
            }
        },
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            colors: {
                brand: {
                    950: '#0a0f1c',
                    900: '#111827',
                    800: '#1f2937',
                    700: '#374151',
                    red: '#991b1b',
                    gold: '#d97706',
                    light: '#f9fafb',
                }
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'fade-in-right': 'fadeInRight 1s ease-out forwards',
                'shimmer': 'shimmer 2s infinite linear',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'ken-burns': 'kenBurns 20s ease-out infinite alternate',
                'fade-in': 'fadeIn 1s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(50px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
                    '100%': { transform: 'translateX(200%) skewX(-12deg)' }
                },
                kenBurns: {
                    '0%': { transform: 'scale(1.0)' },
                    '100%': { transform: 'scale(1.1)' }
                }
            },
            screens: {
                'xs': '375px',
                '3xl': '1920px',
                '4xl': '2560px',
            }
        }
    },
    plugins: [],
}
