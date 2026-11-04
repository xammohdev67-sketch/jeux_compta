/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          emerald: '#059669',
          slate: '#0F172A',
          gold: '#EAB308',
        },
      },
    },
  },
  plugins: [],
};
