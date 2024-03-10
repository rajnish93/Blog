/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure Next.js to Handle SVG Files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
