// hooks/useVisitorCounter.ts
import {useEffect, useState} from 'react';

export function useVisitorCounter() {
    const [visits, setVisits] = useState < number | null > null;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState < Error | null > null;

    useEffect(() => {
        const incrementVisitor = async () => {
            try {
                await fetch('https://your-strapi-url.com/api/visitor-counter/increment', {
                    method: 'POST',
                });

                const res = await fetch('https://your-strapi-url.com/api/visitor-counter');
                const data = await res.json();
                setVisits(data.count);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        incrementVisitor();
    }, []);

    return {visits, loading, error};
}
