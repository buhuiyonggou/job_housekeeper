/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  transpilePackages: ['@acme/ui', 'lodash-es'],
};

export default nextConfig;
