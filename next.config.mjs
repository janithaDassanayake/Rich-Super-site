/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Product images live in /public/items/. Next/Image serves them as static
    // assets, no remote loader needed.
    unoptimized: false,
  },
};

export default nextConfig;
