import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        'primary': '#0665DB',
        'secondary': '#7D82FF',
        'black-50': '#222222',
        'black-100': '#333333',
        'white-50': '#F3F6F8',
        'white-100': '#F1F0F0',
        'accent': '#9D9D9D'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      minHeight: {
        screen: 'calc(100vh - 56px)',
      },
    },
    screens: {
      sm: '450px',
      md: '768px',
      lg: '1280px',
      xl: '1440px'
    }
  },
  plugins: [require("tailwindcss-animate")],
}

export default config;