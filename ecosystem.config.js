// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'jsravelo',
      script: 'npm run start',
      cwd: '/var/www/jsravelo',

      // Activa el modo cluster para usar los 4 núcleos
      //exec_mode: 'cluster',
      //instances: '', // O 'max' para usar todos los disponibles

      /**
       * Límite de memoria por CADA worker.
       * Si un worker supera los 1GB, solo ese worker se reiniciará.
       */
      max_memory_restart: '1G',

      /**
       * Tiempo de espera para el cierre elegante.
       * PM2 esperará 15 segundos a que el worker termine sus tareas
       * antes de forzar el cierre. Ajusta si tus tareas son muy largas.
       */
      //kill_timeout: 15000,

      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      out_file: './logs/out.log',
      error_file: './logs/error.log'
    }
  ]
};