const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/oauth2",
        createProxyMiddleware({
            target: `${process.env.SELF_DOMAIN}`,
            changeOrigin: true,
            secure: false,
        })
    );

    app.use(
        "/api",
        createProxyMiddleware({
            target: `${process.env.SELF_DOMAIN}`,
            changeOrigin: true,
            secure: false,
        })
    );
};
