/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        serif: ['Unbounded', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          950: '#071018',
          900: '#0b1b2b',
          800: '#0f2740',
          700: '#163a5d',
          red: '#1d4ed8',   // primary -> blue
          gold: '#38bdf8',  // accent -> sky
          light: '#f8fafc',
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

