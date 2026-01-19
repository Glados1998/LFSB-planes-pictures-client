import createMiddleware from 'next-intl/middleware';
import {localePrefix, locales} from './utils/navigation';

export default createMiddleware({
    defaultLocale: 'FR',
    localePrefix,
    locales
});
