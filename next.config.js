/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  trailingSlash: true, // Crucial for matching existing WordPress URLs like /static-pass-box/
  images: {
    unoptimized: true, // High reliability across local and static hosting, avoids remote image domain blocks
  },
  async rewrites() {
    return [
      {
        source: '/blog/:path*/uploads/:file*',
        destination: '/uploads/:file*',
      },
      {
        source: '/blog/:path*/wp-content/uploads/:file*',
        destination: '/wp-content/uploads/:file*',
      },
      {
        source: '/admin/uploads/:file*',
        destination: '/uploads/:file*',
      },
      {
        source: '/admin/wp-content/uploads/:file*',
        destination: '/wp-content/uploads/:file*',
      },
      {
        source: '/industries/:path*/uploads/:file*',
        destination: '/uploads/:file*',
      },
      {
        source: '/wp-content/uploads/:file*',
        destination: '/wp-content/uploads/:file*',
      },
    ];
  },
  async redirects() {
    let customRedirects = [];
    try {
      customRedirects = require("./src/data/redirects.json");
    } catch (e) {}

    return [
      ...customRedirects,
      {
        source: '/products',
        destination: '/clean-room-equipment/',
        permanent: false,
      },
      {
        source: '/products/',
        destination: '/clean-room-equipment/',
        permanent: false,
      }
    ];
  },
};

module.exports = nextConfig;
