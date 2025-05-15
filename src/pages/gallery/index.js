import axios from 'axios';
import {useEffect, useState} from 'react';
import qs from 'qs';
import GalleryFilter from "@/components/gallerFilter";
import Card from "@/components/card";
import {PiWarningFill} from "react-icons/pi";
import PaginationComponent from "@/components/paginationComponent";

export async function getStaticProps(context) {
    return {
        props: {

            messages: (await import(`public/locales/${context.locale}.json`)).default
        }
    };
}


export default function Gallery() {
    const [sysMessage, setSysMessage] = useState('')
    const [aircraft, setAircraft] = useState([]);
    const [pagination, setPagination] = useState({});
    const [pageIndex, setPageIndex] = useState(1)
    const [filters, setFilters] = useState({
        operator: '',
        type: '',
        registration: ''
    });

    useEffect(() => {
        const filterQuery = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value) {
                if (key === 'registration') {
                    acc[`filters[${key}][$containsi]`] = value;
                } else {
                    acc[`filters[${key}][id][$eqi]`] = value;
                }
            }
            return acc;
        }, {});

        const queryString = qs.stringify({
            ...filterQuery,
            populate: '*',
        }, {
            encodeValuesOnly: true,
            skipNulls: true
        });

        axios.get(`https://strapi-production-1911.up.railway.app/api/aircrafts?sort[0]=DateOfPictureShoot:desc&${queryString}&pagination[page]=${pageIndex}&pagination[pageSize]=12`)
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

    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value
        }));
        console.log(value, filterType, filters)
    };

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
        <div className={"container grid grid-flow-row gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
            <header className={"flex justify-center px-4 py-2 bg-white rounded-lg"}>
                <GalleryFilter onFilterChange={handleFilterChange} dataPresent={aircraft.length > 0}/>
            </header>

            {aircraft.length > 0 ? (
                <>
                    <main className={"flex flex-col flex-wrap justify-center"}>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-items-center">
                            {aircraft.map(plane => (
                                <Card key={plane.id} plane={plane}/>
                            ))}
                        </div>
                    </main>
                    <footer className={"flex justify-center items-center gap-4"}>
                        <PaginationComponent
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                            pagination={pagination}
                        />
                    </footer>
                </>
            ) : sysMessage && (
                <div>
                    <div>
                        <div>
                            <PiWarningFill/>
                        </div>
                        <p>{sysMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
