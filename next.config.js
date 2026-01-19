/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    i18n: {
        locales: ['FR', 'EN', 'DE'],
        defaultLocale: 'FR',
        localeDetection: true,
    },
    env: {
        STRAPI_API_URL: process.env.STRAPI_API_URL,
    }
}

module.exports = nextConfig
