import axios from 'axios';
import {useEffect, useState} from 'react';
import qs from 'qs';
import GalleryFilter from "@/components/gallerFilter";
import Card from "@/components/card";
import {PiWarningFill} from "react-icons/pi";
import PaginationComponent from "@/components/paginationComponent";

const EMPTY_FILTERS = {
    operator: '',
    type: '',
    registration: ''
};

/**
 * Fetches static props for the Gallery page, including localized messages.
 * @param {object} context - The context object containing locale information.
 * @returns {Promise<{props: {messages: object}}>} The props object with localized messages.
 */
export async function getStaticProps(context) {
    return {
        props: {
            messages: (await import(`messages/${context.locale}.json`)).default
        }
    };
}


/**
 * Gallery page component.
 * Displays a list of aircraft with filtering and pagination.
 * Fetches data from the Strapi API based on selected filters and page index.
 * Handles system messages for empty or error states.
 *
 * @component
 * @returns {JSX.Element} The rendered Gallery page.
 */
export default function Gallery() {
    const [sysMessage, setSysMessage] = useState('')
    const [aircraft, setAircraft] = useState([]);
    const [pagination, setPagination] = useState({});
    const [pageIndex, setPageIndex] = useState(1)
    const [filters, setFilters] = useState(EMPTY_FILTERS);

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

        axios.get(`${process.env.STRAPI_API_URL}/aircrafts?sort[0]=DateOfPictureShoot:desc&${queryString}&pagination[page]=${pageIndex}&pagination[pageSize]=12`)
            .then(res => {
                if (res.data.data.length > 0) {
                    setAircraft(res.data.data);
                    setPagination(res.data.meta.pagination);
                    setSysMessage('');
                } else {
                    setAircraft([]);
                    setPagination({});
                    setSysMessage('Aucun données trouvées.');
                }
            })
            .catch(err => {
                console.error(err);
                setAircraft([]);
                setPagination({});
                setSysMessage('Une erreur est survenue lors de la récupération des données');
            });
    }, [filters, pageIndex]);

    /**
     * Handles changes to filter values.
     * Updates the filters state and logs the change.
     *
     * @param {string} filterType - The type of filter being changed.
     * @param {string} value - The new value for the filter.
     */
    const handleFilterChange = (filterType, value) => {
        setPageIndex(1);
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value
        }));
    };

    const handleResetFilters = () => {
        setPageIndex(1);
        setFilters(EMPTY_FILTERS);
    };

    return (
        <div className={"container grid grid-flow-row gap-8 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8"}>
            <header className={"flex justify-start px-4 py-2"}>
                <GalleryFilter
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onResetFilters={handleResetFilters}
                    dataPresent={aircraft.length > 0}
                />
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
