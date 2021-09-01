module.exports = {
  apps: [
    {
      name: 'kemaytechology',
      script: 'node dist/main',
      watch: true,
      env_production: {
        PORT: 8080,
        NODE_ENV: 'production',
      },
      env_development: {
        PORT: 80,
        NODE_ENV: 'development',
      },
    },
  ],
};
