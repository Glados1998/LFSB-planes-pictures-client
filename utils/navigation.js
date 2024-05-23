const {createSharedPathnamesNavigation} = require('next-intl/navigation');

export const locales = ['en', 'de', 'fr'];
export const localePrefix = 'always'; // Default

const {Link, redirect, usePathname, useRouter} =
    createSharedPathnamesNavigation({locales, localePrefix});

module.exports = {Link, redirect, usePathname, useRouter};