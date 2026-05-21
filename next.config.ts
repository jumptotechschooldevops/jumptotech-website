import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/jumptotech-website",
  assetPrefix: "/jumptotech-website/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
