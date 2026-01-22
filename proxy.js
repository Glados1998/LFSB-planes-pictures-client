import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'fr'
});

export const config = {
    // Skip all internal paths and static files
    matcher: ['/((?!api|_next|.*\\..*).*)']
};
