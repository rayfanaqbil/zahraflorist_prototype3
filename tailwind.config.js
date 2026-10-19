export default {
  content: ['./*.html', './home.js', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',
        ink: '#26372D',
        forest: '#315746',
        blush: '#EEDDD7'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif']
      },
      maxWidth: {
        content: '1200px'
      }
    }
  },
  plugins: []
};
