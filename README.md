# austinteer.github.io
Personal Website

## Development

This is a static Jekyll site with the compiled public assets checked in for
GitHub Pages.

Install dependencies:

```sh
rbenv install 3.3.11 # if needed
bundle install
npm install
```

Build the generated CSS/JS and the Jekyll site:

```sh
npm run build
```

Run a local Jekyll server after rebuilding assets:

```sh
npm run serve
```

The source Sass lives in `assets/_styles`, with the small set of legacy
inuitcss partials vendored in `assets/_vendor/inuitcss`. The generated files
served by GitHub Pages are `assets/css/style.css`, `assets/js/app.js`, and
`assets/js/modernizr.js`.
