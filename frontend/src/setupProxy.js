const proxy = require("http-proxy-middleware");

const HOST = process.env.HOST || "http://localhost:4000";

module.exports = function (app) {
  app.use(
    proxy("/graphql", {
      target: HOST,
      changeOrigin: true,
    })
  );
};
