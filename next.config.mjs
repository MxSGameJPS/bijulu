/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000, // Verifica a cada 1000ms (1 segundo)
      aggregateTimeout: 300,
    };
    return config;
  },
  turbopack: {}, // Silencia aviso de conflito com webpack config
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
