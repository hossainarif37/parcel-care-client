/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0665DB',
        'secondary': '#7D82FF',
        'black-50': '#222222',
        'white-50': '#F3F6F8',
        'white-100': '#F1F0F0',
        'accent': '#9D9D9D'
      },
    },
  },
  plugins: [],
}