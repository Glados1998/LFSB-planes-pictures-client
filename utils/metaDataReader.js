const ExifReader = require('exifreader');

/**
 * MetaDataReader function to read EXIF data from an image URL.
 * @async
 * @param {string} imageUrl - The URL of the image to read EXIF data from.
 * @returns {Promise<object>} A promise that resolves to an object containing the EXIF data.
 * @throws Will throw an error if the fetch operation fails.
 */
export default async function MetaDataReader(imageUrl) {
    const response = await fetch(imageUrl);
    if (!response.ok) {
        throw new Error(`Unable to load image metadata (${response.status})`);
    }

    return ExifReader.load(await response.arrayBuffer());
}
