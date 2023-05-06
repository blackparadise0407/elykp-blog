/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/routes/**/*.{svelte,ts}', './src/**/*.html'],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      },
      screens: {
        DEFAULT: '100%',
        sm: '440px',
        md: '668px',
        lg: '724px',
        xl: '920px',
        '2xl': '1036px'
      },
      center: true
    },
    extend: {}
  },
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'halloween',
      'forest',
      'aqua',
      'lofi',
      'fantasy',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'business',
      'lemonade',
      'night',
      'winter'
    ]
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
