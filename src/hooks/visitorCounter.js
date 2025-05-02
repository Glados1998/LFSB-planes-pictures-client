import {useEffect, useState} from 'react';
import axios from 'axios';

export function useVisitorCounter() {
    const [visits, setVisits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getVisitorCounter = async () => {
            try {
                // Fetch current count
                const res = await axios.get(`https://strapi-production-1911.up.railway.app/api/visitor-counter`);

                // Check for non-JSON response
                if (typeof res.data !== 'object') {
                    throw new Error('Received non-JSON response from API');
                }
                console.log('Current visitor count:', res.data);
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
