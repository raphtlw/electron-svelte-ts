const PRODUCTION = !process.env.ROLLUP_WATCH;

module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(PRODUCTION ? { cssnano: {} } : {}),
  },
};
