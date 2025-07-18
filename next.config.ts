import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "drive.google.com",
      },
      {
        hostname: "cdn2.fptshop.com.vn",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
