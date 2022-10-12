

// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api',{
          target: 'https://lms.jdnc.or.kr', // 비지니스 서버 URL 설정
          changeOrigin: true,
          secure:false
        })
      );
};