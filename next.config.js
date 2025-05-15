/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    i18n: {
        locales: ['fr', 'en', 'de'],
        defaultLocale: 'fr',
        localeDetection: true,
    }
}

module.exports = nextConfig
