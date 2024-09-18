/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-import": [require("tailwindcss"), require("autoprefixer")]
  }
};

export default config;
