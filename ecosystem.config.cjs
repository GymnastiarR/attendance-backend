module.exports = {
    apps: [ {
        name: "main app",
        script: "./index.js",
        args: "limit",
        env: {
            PORT: 3000,
            NODE_ENV: "development",
            DATABASE_URL: "mysql://root:Gymnas.291102@localhost:3306/AttendanceSystemInformation?schema=public",
            KEY: "a4Sly75HWX"
        },
        env_production: {
            PORT: 3000,
            NODE_ENV: "production",
            DATABASE_URL: "mysql://root:Gymnas.291102@localhost:3306/AttendanceSystemInformation?schema=public",
            KEY: "a4Sly75HWX"
        }
    } ]
};