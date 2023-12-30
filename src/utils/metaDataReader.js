const ExifReader = require('exifreader');

export default async function MetaDataReader(imageUrl) {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const arrayBuffer = await new Response(blob).arrayBuffer();
        const tags = ExifReader.load(arrayBuffer);
        // Process and return the EXIF data as needed
        return tags;
    } catch (error) {
        console.error('Error loading EXIF data:', error);
        return {}; // Return an empty object or handle the error as needed
    }
}
