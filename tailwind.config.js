/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#4d7eff',
        'accent-foreground': '#dbe6ff',
      },
    },
  },
  plugins: [],
}
