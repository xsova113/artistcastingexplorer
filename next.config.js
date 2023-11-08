/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i0.wp.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "castingjapanese.ca",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "embed.filekitcdn.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "**",
      },
    ],
  },

  experimental: { serverActions: true },
  // images: {
  //   domains: [
  //     "i0.wp.com",
  //     "castingjapanese.ca",
  //     "img.clerk.com",
  //     "res.cloudinary.com",
  //     "embed.filekitcdn.com",
  //     "utfs.io",
  //   ],
  // },
};

module.exports = nextConfig;
