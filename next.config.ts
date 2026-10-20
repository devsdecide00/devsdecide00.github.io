import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return ['/hvac', '/construction', '/staffing'].map((source) => ({ source, destination: '/', permanent: true }));
  },
};

export default nextConfig;
