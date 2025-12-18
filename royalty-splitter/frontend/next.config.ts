import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "undici": "./empty-mock.js",
    },
  },
  // config options here
};

export default nextConfig;
