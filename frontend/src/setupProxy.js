const proxy = require("http-proxy-middleware");

const API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:4000";

module.exports = function (app) {
  app.use(
    proxy("/graphql", {
      target: API_ENDPOINT,
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
