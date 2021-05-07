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
}
