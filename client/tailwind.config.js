/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255, 255, 255, 0.12)'
      }
    }
  },
  plugins: []
};
