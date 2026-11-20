/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  trailingSlash: true, // Crucial for matching existing WordPress URLs like /static-pass-box/
  images: {
    unoptimized: true, // High reliability across local and static hosting, avoids remote image domain blocks
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
