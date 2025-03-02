/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Aplica el header a todas las rutas
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Configuración básica de CSP; ajústala según tus necesidades.
            value: "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
