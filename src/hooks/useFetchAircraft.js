import {useEffect, useState} from 'react';
import axios from 'axios';
import qs from 'qs';

const useFetchAircraft = (filters, pageIndex) => {
    const [data, setData] = useState({aircraft: [], pagination: {}});
    const [sysMessage, setSysMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAircraft = async () => {
            setIsLoading(true);
            try {
                const filterQuery = Object.entries(filters).reduce((acc, [key, value]) => {
                    if (value) {
                        acc[`filters[${key}][id][$eqi]`] = value;
                    }
                    return acc;
                }, {});

                const queryString = qs.stringify({...filterQuery, populate: '*'}, {
                    encodeValuesOnly: true,
                    skipNulls: true
                });
                const response = await axios.get(`${process.env.STRAPI_API_URL}/aircrafts?sort[0]=DateOfPictureShoot:desc&${queryString}&pagination[page]=${pageIndex}&pagination[pageSize]=12`);

                if (response.data.data.length > 0) {
                    setData({aircraft: response.data.data, pagination: response.data.meta.pagination});
                } else {
                    setSysMessage('Aucun données trouvées.');
                }
            } catch (error) {
                console.error('Error fetching aircraft data:', error.response ? error.response.data : error.message);
                setSysMessage('Une erreur est survenue lors de la récupération des données');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAircraft();
    }, [filters, pageIndex]);

    return {...data, sysMessage, isLoading};
};

export default useFetchAircraft;
