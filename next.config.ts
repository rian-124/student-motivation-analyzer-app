import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.20.10.8"],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
