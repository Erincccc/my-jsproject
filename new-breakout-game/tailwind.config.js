/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,jsx,html}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}

