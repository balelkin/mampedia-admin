const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api/**',
    createProxyMiddleware({
      target: 'https://api.mampediaapp.com', // original url
      changeOrigin: true,
    }),
  );
};
