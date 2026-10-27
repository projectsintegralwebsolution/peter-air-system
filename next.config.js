/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // Crucial for matching existing WordPress URLs like /static-pass-box/
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'peterairs.com',
      },
      {
        protocol: 'https',
        hostname: 'www.peterairs.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
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
        permanent: true,
      },
      {
        source: '/products/',
        destination: '/clean-room-equipment/',
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig;
