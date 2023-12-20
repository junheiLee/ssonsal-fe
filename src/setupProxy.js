const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(['/api','/user','/games','/match-teams','/match-applications'],{
      target: "http://localhost:8090",
      changeOrigin: true,
    })
  );
};
