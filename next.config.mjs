import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",   
    images: {
        domains: ['res.cloudinary.com', 'randomuser.me', 'ui-avatars.com', 'lh3.googleusercontent.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ui-avatars.com'
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/duxay6ujg/**'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'randomuser.me',
                pathname: '/api/portraits/**'
            }
        ],
    }
};

export default nextConfig;