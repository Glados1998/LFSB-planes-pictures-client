import {useEffect, useState} from 'react';
import GalleryFilter from "@/components/gallerFilter";
import Card from "@/components/card";
import {PiWarningFill} from "react-icons/pi";
import PaginationComponent from "@/components/paginationComponent";
import {apiClient, isRequestCanceled} from "@/lib/apiClient";
import {buildAircraftQuery} from "@/lib/aircraftQuery";
import {useTranslations} from "next-intl";
import Head from "next/head";

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
    const t = useTranslations("galleryStates");
    const [status, setStatus] = useState(null);
    const [aircraft, setAircraft] = useState([]);
    const [pagination, setPagination] = useState({});
    const [pageIndex, setPageIndex] = useState(1);
    const [filters, setFilters] = useState(EMPTY_FILTERS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const queryString = buildAircraftQuery(filters, pageIndex);

        apiClient.get(`/aircrafts?${queryString}`, {signal: controller.signal})
            .then(res => {
                if (res.data.data.length > 0) {
                    setAircraft(res.data.data);
                    setPagination(res.data.meta.pagination);
                    setStatus(null);
                } else {
                    setAircraft([]);
                    setPagination({});
                    setStatus("empty");
                }
            })
            .catch(err => {
                if (!isRequestCanceled(err)) {
                    console.error(err);
                    setAircraft([]);
                    setPagination({});
                    setStatus("error");
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            });

        return () => controller.abort();
    }, [filters, pageIndex]);

    /**
     * Handles changes to filter values.
     * Updates the filters state and logs the change.
     *
     * @param {string} filterType - The type of filter being changed.
     * @param {string} value - The new value for the filter.
     */
    const handleFilterChange = (filterType, value) => {
        setIsLoading(true);
        setPageIndex(1);
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value
        }));
    };

    const handleResetFilters = () => {
        setIsLoading(true);
        setPageIndex(1);
        setFilters(EMPTY_FILTERS);
    };

    const handlePageChange = (page) => {
        setIsLoading(true);
        setPageIndex(page);
    };

    return (
        <main className={"container grid grid-flow-row gap-8 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8"}>
            <Head>
                <title>Gallery | LFSB Planes Pictures</title>
            </Head>
            <h1 className="sr-only">{t("title")}</h1>
            <header className={"flex justify-start px-4 py-2"}>
                <GalleryFilter
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onResetFilters={handleResetFilters}
                />
            </header>

            {isLoading ? (
                <div className="flex min-h-48 items-center justify-center" role="status" aria-live="polite">
                    <p>{t("loading")}</p>
                </div>
            ) : aircraft.length > 0 ? (
                <>
                    <section className={"flex flex-col flex-wrap justify-center"}>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-items-center">
                            {aircraft.map(plane => (
                                <Card key={plane.id} plane={plane}/>
                            ))}
                        </div>
                    </section>
                    <footer className={"flex justify-center items-center gap-4"}>
                        <PaginationComponent
                            pageIndex={pageIndex}
                            setPageIndex={handlePageChange}
                            pagination={pagination}
                        />
                    </footer>
                </>
            ) : status && (
                <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-center" role="status">
                    <PiWarningFill className="size-8 text-amber-600" aria-hidden="true"/>
                    <p>{t(status)}</p>
                </div>
            )}
        </main>
    );
}
