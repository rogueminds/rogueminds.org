module.exports = {
  build_dir: 'build',
  compile_dir: 'dist',
  app_files: {
    coffee: [ 'src/**/*.coffee' ],
    images: [ 'src/**/*.png', 'src/**/*.jpg' ],
    js: [ 'src/**/*.js' ],
    less: [ 'src/less/main.less' ],
    html: [ 'src/index.html' ]
  },
  vendor_files: {
    js: [
      'vendor/jquery/dist/jquery.js',
      'vendor/jquery.easing/js/jquery.easing.js',
      'vendor/mixitup/src/jquery.mixitup.js'
    ],
    css: [
    ]
  },
};