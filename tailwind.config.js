/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "headline": ["Bebas Neue", "sans-serif"],
        "body": ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
}
