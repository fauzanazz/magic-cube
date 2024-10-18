/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/result',
        destination: '/result/state-awal',
        permanent: true, // Set to true for a 308 Permanent Redirect
      },
    ];
  },
};

export default nextConfig;