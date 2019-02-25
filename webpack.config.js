// This is webpack config for IDE
const path = require('path')

module.export = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname + '/src'),
      '@style': path.resolve(__dirname + '/src/style'),
      '@components': path.resolve(__dirname + '/src/js/vue/components')
    },
  }
}
