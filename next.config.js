/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "i0.wp.com",
      "castingjapanese.ca",
      "img.clerk.com",
      "res.cloudinary.com",
    ],
  },

  experimental: { serverActions: true },
};

module.exports = nextConfig;
