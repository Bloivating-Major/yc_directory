import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images : {
      remotePatterns : [
        {
          protocol : "https",
          hostname : "*",
        }
      ]
   },
   experimental: {
    ppr: "incremental",
    after: true,
  },
};

export default nextConfig;
