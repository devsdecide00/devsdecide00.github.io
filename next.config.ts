import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverMaxBodySize: '16kb',
  },
};

export default nextConfig;
