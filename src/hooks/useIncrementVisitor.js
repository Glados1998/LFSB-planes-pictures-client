// hooks/useIncrementVisitor.js
import {useEffect} from 'react';
import axios from 'axios';

export function useIncrementVisitor() {
    useEffect(() => {
        let isCancelled = false;

        const increment = async () => {
            try {
                const apiUrl = process.env.STRAPI_API_URL || 'https://strapi-production-1911.up.railway.app/api';
                const response = await axios.post(`${apiUrl}/visitor-counter/increment`);
                if (!isCancelled) {
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
