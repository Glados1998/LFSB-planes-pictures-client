function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB');
}

export default formatDate;