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
        md: '568px',
        lg: '624px',
        xl: '820px',
        '2xl': '936px'
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
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter'
    ]
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
