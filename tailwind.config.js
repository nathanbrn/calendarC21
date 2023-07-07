/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        Purple: '#971cb7',

        Red: '#dd0002',

        Gray: '#ddd9dd',

        Black: '#0f0e11',
      },
      width: {
        '1/7': '14.2857143%',
      }
    },
  },
  plugins: [],
};
