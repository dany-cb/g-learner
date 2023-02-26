/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// add image optimization
nextConfig.images = {
  domains: ["gw.alipayobjects.com"],
};

module.exports = nextConfig;
