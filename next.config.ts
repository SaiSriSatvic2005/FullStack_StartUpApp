// import type { NextConfig } from "next";
// import { hostname } from "os";

// const nextConfig: NextConfig = {
  


//   }
// };


// @ts-check
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    dangerouslyAllowSVG:true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      }
    ]
  }
};

module.exports = nextConfig;