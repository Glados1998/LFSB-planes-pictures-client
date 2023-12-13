import axios from 'axios';
import {useEffect, useState} from 'react';
import qs from 'qs';
import GalleryFilter from "@/components/galler-filter";
import Card from "@/components/card";

export default function Gallery() {
    const [aircraft, setAircraft] = useState([]);
    const [pagination, setPagination] = useState({});
    const [pageIndex, setPageIndex] = useState(1)
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
            populate: '*'
        }, {
            encodeValuesOnly: true,
            skipNulls: true
        });

        axios.get(`https://strapi-production-1911.up.railway.app/api/aircrafts?${queryString}&pagination[page]=${pageIndex}&pagination[pageSize]=12`)
            .then(res => {
                setAircraft(res.data.data);
                setPagination(res.data.meta.pagination);
            })
            .catch(err => {
                console.error(err);
            });
    }, [filters,pageIndex]);

    // Handle filter changes
    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value
        }));
    };

    // Pagination handlers
    const handlePrevious = () => {
        if (pageIndex > 1) {
            setPageIndex(pageIndex - 1);
        }
    };

    const handleNext = () => {
        if (pageIndex < pagination.pageCount) {
            setPageIndex(pageIndex + 1);
        }
    };

    return (
        <div className={'gallery'}>
            <div className={'filter-component'}>
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
                <button className={"btn btn-pagination"} onClick={handlePrevious} disabled={pageIndex === 1}>
                    Précédent
                </button>
                <span>
                    {`${pageIndex} of ${pagination.pageCount}`}
                </span>
                <button className={"btn btn-pagination"} onClick={handleNext} disabled={pageIndex === pagination.pageCount}>
                    Suivant
                </button>
            </div>
        </div>
    );
}
