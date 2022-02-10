const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      purple: colors.purple,
      neutral: colors.neutral,
      cta: {
        50: '#7bc4f1',
        100: '#66c3f6',
        200: '#00A9FF',
        300: '#39b2fa',
        400: '#0daaff',
        500: '#00A9FF',
        600: '#018fd7',
        700: '#026a9d',
        800: '#005e8a',
        900: '#003a56',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '2536px',
      '4xl': '3536px',
    },
    extend: {},
  },
  plugins: [],
}