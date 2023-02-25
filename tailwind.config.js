const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,md,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', ...defaultTheme.fontFamily.sans],
        mono: ['Share Tech Mono', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        primary: {
          50: '#D5F0D6',
          100: '#B0EAA9',
          200: '#6EE087',
          300: '#48B58C',
          400: '#328E7A',
          500: '#236C61',
          600: '#204E4F',
          700: '#1A363D',
          800: '#142831',
          900: '#102029',
          950: '#0C1820',
        },
      },
    },
  },
  plugins: [],
}
