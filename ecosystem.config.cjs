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
            PORT: 8000,
            NODE_ENV: "production",
            DATABASE_URL: "mysql://root:Gymnas.291102@localhost:3306/AttendanceSystemInformation?schema=public"
        }
    } ]
};