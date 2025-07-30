// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'jsravelo',
      cwd: '/var/www/jsravelo',
      script: 'npm',
      args: 'start',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
    },
  ],
};