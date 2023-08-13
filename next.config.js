/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ["www.nicepng.com", "media.discordapp.net", "demofree.sirv.com"],
  },
  externals: ["pino-pretty"],
};

module.exports = nextConfig;
