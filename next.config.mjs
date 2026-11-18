/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // old URLs from the first version of the site
      { source: '/pages/temporary', destination: '/', permanent: true },
      { source: '/pages/:slug', destination: '/:slug', permanent: true },
      { source: '/competition', destination: '/competitions', permanent: true },
      { source: '/donations', destination: '/donate', permanent: true },
      { source: '/products', destination: '/store', permanent: true },
    ];
  },
};

export default nextConfig;
