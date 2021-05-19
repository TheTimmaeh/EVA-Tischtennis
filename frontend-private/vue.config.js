module.exports = {
  outputDir: 'dist/web',
  pluginOptions: {
    electronBuilder: {
      outputDir: 'dist/desktop',
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/variables.scss";',
      },
    },
  },
  devServer: {
    host: '127.0.0.1',
    port: 80,
  },
}
