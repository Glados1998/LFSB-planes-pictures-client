/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    i18n: {
        locales: ['fr', 'en-US', 'de-DE'],
        defaultLocale: 'fr',
        localeDetection: true,
    }
}

module.exports = nextConfig
