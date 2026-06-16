import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: "standalone",

  // Image optimization
  images: {
    remotePatterns: [],
    unoptimized: false,
  },

  // Enable compression
  compress: true,

  // Production source maps (optional, disable for security)
  productionBrowserSourceMaps: false,

  // React strict mode
  reactStrictMode: true,

  // Disable x-powered-by header
  poweredByHeader: false,
};

export default nextConfig;
