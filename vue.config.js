module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-d3-examples/'
    : '/',
  outputDir: 'docs'
}
