const path = require('path');
const pathResolve = pathUrl => path.join(__dirname, pathUrl);
module.exports = {
  //配置代理解决跨域
  devServer: {
    proxy: {
      "/api": {
        target: "",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  webpack: {
    // 别名
    alias: {
      '@': pathResolve('src'),
      'views': '@/views',
      'components': '@/components',
      'common': 'components/common',
      'content': 'components/content',
      'assets': '@/assets',
      'utils': '@/utils',
      'store': '@/store',
      'hooks': "@/hooks"
    }
  },
}