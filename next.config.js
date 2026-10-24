/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"]
  },
  // Single-page: route lama dialihkan ke anchor section yang sesuai
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/portfolio", destination: "/#projects", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true }
    ];
  }
};

module.exports = nextConfig;