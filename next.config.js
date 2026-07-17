/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
    i18n: {
        locales: ['fr', 'en', 'de'],
        defaultLocale: 'fr',
    },
    turbopack: {
        root: __dirname,
    },
    env: {
        STRAPI_API_URL: process.env.STRAPI_API_URL,
    }
}

module.exports = nextConfig
