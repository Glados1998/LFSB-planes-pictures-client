const ExifReader = require('exifreader');

/**
 * MetaDataReader function to read EXIF data from an image URL.
 * @async
 * @param {string} imageUrl - The URL of the image to read EXIF data from.
 * @returns {Promise<object>} A promise that resolves to an object containing the EXIF data.
 * @throws Will throw an error if the fetch operation fails.
 */
export default async function MetaDataReader(imageUrl) {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const arrayBuffer = await new Response(blob).arrayBuffer();
        return ExifReader.load(arrayBuffer);
    } catch (error) {
        // Log the error and return an empty object
        console.error('Error loading EXIF data:', error);
        return {}; // Return an empty object or handle the error as needed
    }
}