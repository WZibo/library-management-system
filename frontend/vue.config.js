const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
    }
  },
}