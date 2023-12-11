import axios from 'axios';
import { useEffect, useState } from 'react';
import qs from 'qs';
import GalleryFilter from "@/components/galler-filter";
import Card from "@/components/card";

export default function Gallery() {
    const [aircraft, setAircraft] = useState([]);
    const [filters, setFilters] = useState({
        operator: '',
        type: '',
        serviceNumber: '',
        registration: ''
    });

    // Fetch aircrafts based on filters
    useEffect(() => {
        // Construct the query object for filters
        const filterQuery = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value) {
                // Use the direct string comparison for serviceNumber and registration
                if (key === 'serviceNumber' || key === 'registration') {
                    acc[`filters[${key}][$eq]`] = value;
                } else {
                    acc[`filters[${key}][id][$eq]`] = value;
                }
            }
            return acc;
        }, {});

        // Use qs to stringify the filter query
        const queryString = qs.stringify({
            ...filterQuery,
            populate: '*' // Include populate if needed for Strapi
        }, {
            encodeValuesOnly: true,
            skipNulls: true
        });

        axios.get(`https://strapi-production-1911.up.railway.app/api/aircrafts?${queryString}`)
            .then(res => {
                setAircraft(res.data.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [filters]);

    // Handle filter changes
    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value
        }));
    };
    return (
        <div className={'gallery'}>
            <div className={'filter'}>
                <GalleryFilter onFilterChange={handleFilterChange}/>
            </div>
            <div className={'gallery_area'}>
                {
                    aircraft.map((item, index) => {
                        return (
                            <Card plane={item} key={index}/>
                        )
                    })
                }
            </div>
            <div className={'gallery_footer pagination'}>

            </div>
        </div>
    );
}
