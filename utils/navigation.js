/**
 * Utilities for shared pathnames navigation with internationalization support.
 *
 * This module sets up navigation helpers using `next-intl` for the specified locales.
 *
 * @module utils/navigation
 */

const {createSharedPathnamesNavigation} = require('next-intl/navigation');

/**
 * Supported locales for the application.
 * @type {string[]}
 */
export const locales = ['en', 'de', 'fr'];

/**
 * Locale prefixing strategy.
 * @type {string}
 * @default 'always'
 */
export const localePrefix = 'always'; // Default

/**
 * Navigation helpers for localized routing.
 *
 * @typedef {Object} NavigationHelpers
 * @property {React.ComponentType} Link - Localized link component.
 * @property {Function} redirect - Function to perform localized redirects.
 * @property {Function} usePathname - Hook to get the current pathname.
 * @property {Function} useRouter - Hook to access the router.
 */
const {Link, redirect, usePathname, useRouter} =
    createSharedPathnamesNavigation({locales, localePrefix});

module.exports = {Link, redirect, usePathname, useRouter};
