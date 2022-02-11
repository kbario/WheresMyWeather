module.exports = {
  content: [
    './index.html',
    './css/*.css',
    './js/$.js'
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
