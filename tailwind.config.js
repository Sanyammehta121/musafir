/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#FDF7F4',
          100: '#FBECE6',
          200: '#F6D5C8',
          300: '#EFB6A3',
          400: '#E4886E',
          500: '#D95C38',
          600: '#C24724',
          700: '#9E371B',
          800: '#7E2E19',
          900: '#672A19',
        },
        sand: {
          50: '#FDFBF7',
          100: '#F9F5EC',
          200: '#F2EAD8',
          300: '#E9DBC0',
          400: '#DEC6A3',
          500: '#CCA87B',
        },
        sage: {
          50: '#F4F7F4',
          100: '#E5EDE6',
          500: '#4D7C5F',
          700: '#2C5E43',
          800: '#234B36',
          900: '#1A3728',
        },
        saffron: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
