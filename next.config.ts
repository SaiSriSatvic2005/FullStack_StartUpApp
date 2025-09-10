// import type { NextConfig } from "next";
// import { hostname } from "os";

import build from "next/dist/build";

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
  },
  expertimental:{
    ppr:'incremental'
  },
  devIndicators:{
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
};

module.exports = nextConfig;