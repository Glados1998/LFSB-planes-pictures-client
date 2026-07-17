import {useEffect, useState} from 'react';
import {apiClient, isRequestCanceled} from "@/lib/apiClient";
import {VISITOR_COUNT_UPDATED_EVENT} from "@/hooks/useIncrementVisitor";

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
        const controller = new AbortController();
        /**
         * Fetches the visitor counter from the API and updates state.
         * Handles JSON validation and error management.
         */
        const getVisitorCounter = async () => {
            try {
                // Fetch current count
                const res = await apiClient.get('/visitor-counter', {signal: controller.signal});

                // Check for non-JSON response
                if (typeof res.data !== 'object') {
                    throw new Error('Received non-JSON response from API');
                }
                const count = res.data?.data?.attributes?.count;
                setVisits(count);
            } catch (err) {
                if (!isRequestCanceled(err)) {
                    console.error('Error fetching visitor count:', err);
                    setError(err);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        getVisitorCounter();
        window.addEventListener(VISITOR_COUNT_UPDATED_EVENT, getVisitorCounter);

        return () => {
            controller.abort();
            window.removeEventListener(VISITOR_COUNT_UPDATED_EVENT, getVisitorCounter);
        };
    }, []);

    return {visits, loading, error};
}
