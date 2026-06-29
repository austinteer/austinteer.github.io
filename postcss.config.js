const purgecss = require("@fullhuman/postcss-purgecss");

const purgecssPlugin = purgecss.default || purgecss;

module.exports = {
  plugins: [
    purgecssPlugin({
      content: [
        "./index.html",
        "./_includes/**/*.html",
        "./_layouts/**/*.html",
        "./assets/js/_main.js"
      ],
      safelist: ["move-up", "no-opacity"]
    }),
    require("autoprefixer"),
    require("cssnano")({
      preset: "default"
    })
  ]
};
