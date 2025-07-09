/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['next-auth'], // added because of next/server error (nextauth + nextjs error)
};

export default nextConfig;
