const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        kona: {
          'green-lightest': '#D6EBDA',
          'green-light': '#73BA75',
          green: '#24a23f',
        },
      },
    },
  },
  plugins: [],
}
