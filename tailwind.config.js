/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        zen: {
          50: '#f5f0e8',
          100: '#e8e0d0',
          200: '#d4c9b5',
          300: '#b8a88e',
          400: '#9c8a6e',
          500: '#7a6b52',
          600: '#5c5040',
          700: '#3e3630',
          800: '#2a2420',
          900: '#1a1614',
        },
        leaf: {
          50: '#edf5f0',
          100: '#d1e8d9',
          200: '#a8d4b8',
          300: '#7cbc95',
          400: '#5aa87a',
          500: '#4a7c6f',
          600: '#3d6b5e',
          700: '#2f5448',
          800: '#234038',
          900: '#1a302a',
        },
        water: {
          50: '#eef6fa',
          100: '#d5eaf3',
          200: '#aed5e7',
          300: '#82bcd8',
          400: '#5da3c8',
          500: '#4889ad',
          600: '#3a6f8e',
          700: '#2d566e',
          800: '#214050',
          900: '#182d38',
        },
        pebble: {
          50: '#faf8f5',
          100: '#f0ebe3',
          200: '#e0d6c8',
          300: '#c9baa5',
          400: '#b09d84',
          500: '#968168',
          600: '#7a6a55',
          700: '#5f5243',
          800: '#453d33',
          900: '#2e2924',
        },
        lotus: {
          400: '#e8a0b4',
          500: '#d4789a',
          600: '#b85a7e',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'breathe': 'breathe 10s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '40%': { transform: 'scale(1.15)', opacity: '1' },
          '60%': { transform: 'scale(1.15)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
