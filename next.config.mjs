/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",   
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ui-avatars.com'
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'randomuser.me'
            }
        ]
    }
};

export default nextConfig;