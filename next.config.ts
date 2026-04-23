import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
