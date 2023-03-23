/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// add image optimization
nextConfig.images = {
  domains: ["gw.alipayobjects.com", "img.youtube.com"],
};

module.exports = nextConfig;
