/** @type {import('next').NextConfig} */
import { config } from 'dotenv'

config(); 

const nextConfig = {
    env: {
        BACKEND_PORT: process.env.BACKEND_PORT
    }
};

export default nextConfig;
