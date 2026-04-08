import {useEffect} from 'react';
import axios from 'axios';
import {SESSION_STORAGE_KEYS} from '@/lib/sessionStorageKeys';
import {hasSessionFlag, setSessionFlag} from '@/lib/sessionStore';

/**
 * Custom React hook to increment the visitor counter via an API call.
 *
 * On mount, sends a POST request to the `/visitor-counter/increment` endpoint
 * of the API defined by the `STRAPI_API_URL` environment variable.
 * Logs the result or any error to the console.
 * Ensures no state updates or logs occur if the component is unmounted before the request completes.
 *
 * Usage:
 *   Call `useIncrementVisitor()` inside a React component to increment the visitor count on mount.
 */
export function useIncrementVisitor() {
    useEffect(() => {
        if (hasSessionFlag(SESSION_STORAGE_KEYS.VISITOR_INCREMENTED)) {
            return;
        }

        let isCancelled = false;

        const increment = async () => {
            try {
                const apiUrl = process.env.STRAPI_API_URL;
                const response = await axios.post(`${apiUrl}/visitor-counter/increment`);
                if (!isCancelled) {
                    setSessionFlag(SESSION_STORAGE_KEYS.VISITOR_INCREMENTED);
                    console.log('Visitor count incremented:', response.data);
                }
            } catch (err) {
                if (!isCancelled) {
                    console.error('Error incrementing visitor count:', err);
                }
            }
        };

        increment();

        return () => {
            isCancelled = true;
        };
    }, []);
}
