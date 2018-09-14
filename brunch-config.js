// See http://brunch.io for documentation.
module.exports = {
  paths: {
    public: 'static',
    watched: ['src']
  },
  files: {
    javascripts: {joinTo: 'app.js'},
    stylesheets: {joinTo: 'app.css'}
  },
  npm: {
    enabled: true,
    styles: {
      'tailwindcss': ["dist/tailwind.min.css"]
    }
  }
}
