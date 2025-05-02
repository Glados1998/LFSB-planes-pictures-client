// hooks/useIncrementVisitor.js
import {useEffect} from 'react';
import axios from 'axios';

export function useIncrementVisitor() {
    useEffect(() => {
        const increment = async () => {
            try {
                await axios.post('https://strapi-production-1911.up.railway.app/api/visitor-counter/increment');
                console.log('Visitor count incremented');
            } catch (err) {
                console.error('Error incrementing visitor count:', err);
            }
        };

        increment();
    }, []);
}
