module.exports = {
  // Tailwind Paths
  configJS: 'tailwind.js',
  sourceCSS: 'src/tailwind.less',
  outputCSS: 'src/styles.css',
  // Sass
  sass: true,
  // PurgeCSS Settings
  purge: false,
  keyframes: false,
  fontFace: false,
  rejected: false,
  whitelist: [],
  whitelistPatterns: [],
  whitelistPatternsChildren: [],
  extensions: [
    '.ts',
    '.html',
    '.js'
  ],
  extractors: [],
  content: []
}
