import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    minimumCacheTTL: 86_400,
  },
  async headers() {
    const assetCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=86400, stale-while-revalidate=604800",
      },
    ];

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      { source: "/brand/:path*", headers: assetCache },
      { source: "/homepage/:path*", headers: assetCache },
      { source: "/payments/:path*", headers: assetCache },
      { source: "/platforms/:path*", headers: assetCache },
      { source: "/ranks/:path*", headers: assetCache },
      { source: "/service-icons/:path*", headers: assetCache },
      { source: "/game-icons/:path*", headers: assetCache },
      { source: "/icons/:path*", headers: assetCache },
      { source: "/r6-background.png", headers: assetCache },
    ];
  },
  async redirects() {
    return [
      {
        source: "/boosting",
        destination: "/en/rainbow-six-siege-boost",
        permanent: true,
      },
      {
        source: "/boosting/rank-up",
        destination: "/en/rainbow-six-siege-boost/rainbow-six-siege-rank-boost",
        permanent: true,
      },
      {
        source: "/en/rainbow-six-siege-boost/rank-up",
        destination: "/en/rainbow-six-siege-boost/rainbow-six-siege-rank-boost",
        permanent: true,
      },
      {
        source: "/:lang/rainbow-six-siege-boost/rank-up",
        destination: "/:lang/rainbow-six-siege-boost/rainbow-six-siege-rank-boost",
        permanent: true,
      },
      {
        source: "/boosting/champion",
        destination: "/en/rainbow-six-siege-boost/champion",
        permanent: true,
      },
      {
        source: "/boosting/competitive",
        destination: "/en/rainbow-six-siege-boost/competitive",
        permanent: true,
      },
      {
        source: "/boosting/elearning",
        destination: "/en/rainbow-six-siege-boost/elearning",
        permanent: true,
      },
      {
        source: "/boosting/unrated",
        destination: "/en/rainbow-six-siege-boost/unrated",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
