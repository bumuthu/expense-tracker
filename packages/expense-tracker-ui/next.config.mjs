/** @type {import('next').NextConfig} */
import { config } from 'dotenv'

config(); 

const nextConfig = {
    env: {
        BACKEND_HOST: process.env.BACKEND_HOST
    }
};

export default nextConfig;
