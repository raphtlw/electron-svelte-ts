const PRODUCTION = !process.env.ROLLUP_WATCH;

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(PRODUCTION ? { cssnano: {} } : {}),
  },
};
