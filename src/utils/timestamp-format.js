/**
 * formatDate is a utility function that takes a timestamp and returns a string representation of the date in 'en-GB' format.
 *
 * @param {number} timestamp - The timestamp to be converted into a date string.
 * @returns {string} The date string in 'en-GB' format.
 */
function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB');
}

export default formatDate;