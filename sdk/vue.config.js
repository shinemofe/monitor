const path = require('path')

module.exports = {
  configureWebpack: {
    entry: path.resolve(__dirname, './example/main.js')
  }
}
