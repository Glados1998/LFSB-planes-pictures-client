import {useEffect} from 'react';
import {SESSION_STORAGE_KEYS} from '@/lib/sessionStorageKeys';
import {hasSessionFlag, setSessionFlag} from '@/lib/sessionStore';
import {apiClient, isRequestCanceled} from "@/lib/apiClient";

export const VISITOR_COUNT_UPDATED_EVENT = "lfsb:visitor-count-updated";

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

        const controller = new AbortController();

        const increment = async () => {
            try {
                await apiClient.post('/visitor-counter/increment', null, {signal: controller.signal});
                if (!controller.signal.aborted) {
                    setSessionFlag(SESSION_STORAGE_KEYS.VISITOR_INCREMENTED);
                    window.dispatchEvent(new Event(VISITOR_COUNT_UPDATED_EVENT));
                }
            } catch (err) {
                if (!isRequestCanceled(err)) {
                    console.error('Error incrementing visitor count:', err);
                }
            }
        };

        increment();

        return () => controller.abort();
    }, []);
}
