/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HOPTOKEN_ADDRESS: process.env.HOPTOKEN_ADDRESS,
    NFTBEER_ADDRESS: process.env.NFTBEER_ADDRESS,
    NFTRECIPE_ADDRESS: process.env.NFTRECIPE_ADDRESS,
    CHAIN_ID: process.env.CHAIN_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gateway.pinata.cloud",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
