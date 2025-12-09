/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-orange': '#FF4920',
        'bg-light': '#DFDFF0',
        'bg-dark': '#0a0a0a',
        'bg-secondary-dark': '#1a1a1a',
        'text-dark': '#1a1a1a',
        'text-light': '#ffffff',
        'text-secondary': '#a0a0a0',
        'text-secondary-light': '#666666',
      },
      fontFamily: {
        'sans': ['General Sans', 'sans-serif'],
        'serif': ['Libre Caslon Text', 'serif'],
      },
    },
  },
  plugins: [],
}
