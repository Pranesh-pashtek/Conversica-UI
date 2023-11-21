const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/oauth2",
        createProxyMiddleware({
            target: "http://localhost:",
            changeOrigin: true,
            secure: false,
        })
    );

    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost",
            changeOrigin: true,
            secure: false,
        })
    );
};
