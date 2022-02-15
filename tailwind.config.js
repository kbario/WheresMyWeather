module.exports = {
  content: [
    './index.html',
    './css/dev.css',
    './js/script.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [
  require('@tailwindcss/typography'),
  require('@tailwindcss/forms'),
],
}
