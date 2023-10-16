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
<<<<<<< HEAD
            PORT: 3000,
=======
>>>>>>> 68b00d0d310f7c9d35fd524fa5e09809461f394b
            NODE_ENV: "production",
        }
    } ]
};