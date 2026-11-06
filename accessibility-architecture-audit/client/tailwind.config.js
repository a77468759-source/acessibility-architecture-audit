/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f7ff',
          100: '#e2edff',
          500: '#2347d8',
          700: '#1836ab',
          900: '#10245c',
        },
        accent: '#f59e0b',
        slate: {
          950: '#08142a',
        },
      },
      boxShadow: {
        soft: '0 18px 40px rgba(16, 36, 92, 0.12)',
      },
    },
  },
  plugins: [],
}
