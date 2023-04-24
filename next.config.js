/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "links.papareact.com",
      "aiimagegeneratorap506ed1.blob.core.windows.net",
    ],
  },
};

module.exports = nextConfig;
