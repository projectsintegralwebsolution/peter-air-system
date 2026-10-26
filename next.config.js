/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // Crucial for matching existing WordPress URLs like /static-pass-box/
  images: {
    unoptimized: true, // High reliability across local and static hosting, avoids remote image domain blocks
  },
  async redirects() {
    return [
      {
        source: '/return-air-riser-2',
        destination: '/return-air-riser/',
        permanent: true,
      },
      {
        source: '/return-air-riser-2/',
        destination: '/return-air-riser/',
        permanent: true,
      },
      {
        source: '/about-us-new',
        destination: '/about-us-peter-air-systems/',
        permanent: true,
      },
      {
        source: '/about-us-new/',
        destination: '/about-us-peter-air-systems/',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/about-us-peter-air-systems/',
        permanent: true,
      },
      {
        source: '/about/',
        destination: '/about-us-peter-air-systems/',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contact-peter-air-systems/',
        permanent: true,
      },
      {
        source: '/contact/',
        destination: '/contact-peter-air-systems/',
        permanent: true,
      },
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
