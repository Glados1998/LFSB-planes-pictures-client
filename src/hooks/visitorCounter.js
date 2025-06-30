import {useEffect, useState} from 'react';
import axios from 'axios';

/**
 * Custom React hook to fetch and manage the visitor counter from a Strapi API.
 *
 * @returns {Object} An object containing:
 *   - visits {number|null}: The current visitor count, or null if not loaded.
 *   - loading {boolean}: True while fetching data, false otherwise.
 *   - error {Error|null}: Any error encountered during fetch, or null.
 *
 * Usage:
 *   const { visits, loading, error } = useVisitorCounter();
 */
export function useVisitorCounter() {
    const [visits, setVisits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        /**
         * Fetches the visitor counter from the API and updates state.
         * Handles JSON validation and error management.
         */
        const getVisitorCounter = async () => {
            try {
                // Fetch current count
                const apiUrl = process.env.STRAPI_API_URL;

                const res = await axios.get(`${apiUrl}/visitor-counter`);

                // Check for non-JSON response
                if (typeof res.data !== 'object') {
                    throw new Error('Received non-JSON response from API');
                }
                const count = res.data?.data?.attributes?.count;
                setVisits(count);
            } catch (err) {
                console.error('Error fetching visitor count:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getVisitorCounter();
    }, []);

    return {visits, loading, error};
}
