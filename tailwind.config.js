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
        'black-50': '#2D2D2D',
        'accent': '#9D9D9D'
      },
    },
  },
  plugins: [],
}