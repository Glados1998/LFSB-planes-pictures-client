import axios from 'axios';
import {useEffect, useState} from 'react';
import qs from 'qs';
import GalleryFilter from "@/components/gallerFilter";
import Card from "@/components/card";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {PiWarningFill} from "react-icons/pi";

export default function Gallery() {
    const [sysMessage, setSysMessage] = useState('')
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
            populate: '*',
        }, {
            encodeValuesOnly: true,
            skipNulls: true
        });

        axios.get(`https://strapi-production-1911.up.railway.app/api/aircrafts?sort[0]=publishedAt:desc&${queryString}&pagination[page]=${pageIndex}&pagination[pageSize]=12`)
            .then(res => {
                if (res.data.data.length > 0) {
                    setAircraft(res.data.data);
                    setPagination(res.data.meta.pagination);
                } else {
                    setSysMessage('Aucun données trouvées.');
                }
            })
            .catch(err => {
                console.error(err);
                setSysMessage('Une erreur est survenue lors de la récupération des données');
            });
    }, [filters, pageIndex]);

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
                <GalleryFilter onFilterChange={handleFilterChange} dataPresent={aircraft.length > 0}/>
            </div>

            {aircraft.length > 0 ? (
                <>
                    <div className={'gallery_area'}>
                        {aircraft.map(plane => (
                            <Card key={plane.id} plane={plane}/>
                        ))}
                    </div>
                    <div className={'gallery_footer pagination'}>
                        <button className={"btn-pagination"} onClick={handlePrevious} disabled={pageIndex === 1}>
                            <FaArrowLeft/>
                        </button>
                        <span>
                            {`${pageIndex} sur ${pagination.pageCount}`}
                        </span>
                        <button className={"btn-pagination"} onClick={handleNext}
                                disabled={pageIndex === pagination.pageCount || aircraft.length === 0}>
                            <FaArrowRight/>
                        </button>
                    </div>
                </>
            ) : sysMessage && (
                <div className={'gallery_message'}>
                    <div className="message-box">
                        <div className="icon">
                            <PiWarningFill/>
                        </div>
                        <p>{sysMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
