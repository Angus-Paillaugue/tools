/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/app.handlebars", "./views/index.handlebars", "./views/partials/**/*.handlebars"],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    require('autoprefixer')
  ],
}
