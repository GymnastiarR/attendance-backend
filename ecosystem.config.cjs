module.exports = {
    apps: [ {
        name: "main app",
        script: "./index.js",
        args: "limit",
        env: {
            PORT: 5000,
            NODE_ENV: "development",
        },
        env_production: {
            PORT: 3000,
            NODE_ENV: "production",
        }
    } ]
};