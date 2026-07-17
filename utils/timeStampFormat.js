/**
 * formatDate is a utility function that takes a timestamp and returns a string representation of the date in 'en-GB' format.
 *
 * @param {number|string|Date} timestamp - The timestamp to be converted into a date string.
 * @param {string} locale - Locale used to format the date.
 * @param {string} fallback - Value returned for missing or invalid dates.
 * @returns {string} The date string in 'en-GB' format.
 */
function FormatDate(timestamp, locale = 'en-GB', fallback = 'N/A') {
    if (timestamp === null || timestamp === undefined || timestamp === '') {
        return fallback;
    }

    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
        return fallback;
    }

    return date.toLocaleDateString(locale);
}

export default FormatDate;
