const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/oauth2",
        createProxyMiddleware({
            target: "https://18.189.79.235",
            changeOrigin: true,
            secure: false,
        })
    );

    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://18.189.79.235",
            changeOrigin: true,
            secure: false,
        })
    );
};
