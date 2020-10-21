const proxy = require("http-proxy-middleware");

const HOST = process.env.HOST || "http://localhost:4000";

module.exports = function (app) {
  app.use(
    proxy("/graphql", {
      target: HOST,
      changeOrigin: true,
    })
  );
  app.use(
    proxy("/external", {
      target: "http://localhost:3000",
      router: (req) => {
        const replaced = req.path.replace("/external/", "");
        const trueUrl = new URL(
          replaced.startsWith("https://") ? replaced : `https://${replaced}`
        );
        return trueUrl.origin;
      },
      pathRewrite: (path) => {
        const replaced = path.replace("/external/", "");
        const trueUrl = new URL(
          replaced.startsWith("https://") ? replaced : `https://${replaced}`
        );
        return trueUrl.pathname;
      },
      changeOrigin: true,
    })
  );
};
