const production = !process.env.ROLLUP_WATCH;

module.exports = {
  // future: {
  //   purgeLayersByDefault: true,
  //   removeDeprecatedGapUtilities: true,
  // },
  // content: ['./src/**/*.svelte'],
  purge: {
    content: ['./src/**/*.svelte'],
    enabled: production, // disable purge in dev
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
