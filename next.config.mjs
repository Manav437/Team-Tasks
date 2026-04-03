/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "img.icons8.com",
            },
            {
                protocol: "https",
                hostname: "i.pinimg.com",
                port: '',
                pathname: "/**"
            },
        ],
    },
};

export default nextConfig;
