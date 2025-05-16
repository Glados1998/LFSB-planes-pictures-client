/**
 * AircraftDetail is a React component that fetches and displays details of a specific aircraft.
 * It fetches the aircraft data from an API based on the id from the router query.
 * It also handles loading and error states, and displays an overlay when the aircraft image is clicked.
 *
 * @component
 */
import {useRouter} from 'next/router';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Link from "next/link";
import formatDate from "../../../utils/timeStampFormat";
import notFound from "@/assets/images/imageNotFound.jpg";
import MetaDataReader from "../../../utils/metaDataReader";
import {
    MdAccessAlarm,
    MdBlurOn,
    MdCalendarMonth,
    MdCamera,
    MdCameraAlt,
    MdFlashOff,
    MdFlashOn,
    MdIso
} from "react-icons/md";
import {useTranslations} from "next-intl";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

export async function getStaticProps(context) {
    return {
        props: {
            messages: (await import(`public/locales/${context.locale}.json`)).default
        }
    };
}

export async function getStaticPaths() {
    return {
        paths: ["/gallery/id"],
        fallback: true
    };
}

const DetailItem = ({label, value}) => (
    <div>
        <p className="font-semibold text-gray-600">{label}:</p>
        <span className="text-gray-800">{value || 'N/A'}</span>
    </div>
);

const ImageDetailItem = ({icon, label, value, subLabel}) => (
    <div className="flex items-center space-x-3">
        {icon}
        <div>
            <p className="font-semibold text-gray-800">{label}</p>
            {subLabel && <p className="text-sm text-gray-600">{subLabel}</p>}
            {value && <span className="text-gray-700">{value}</span>}
        </div>
    </div>
);


export default function AircraftDetail() {
    // Use the Next.js router to get the id from the query
    const router = useRouter();
    const {id} = router.query;

    const t = useTranslations("gallery.details");

    // State variable for the aircraft data, loading state, system message, and overlay visibility
    const [state, setState] = useState({
        aircraft: null,
        metaData: null,
        isLoading: true,
        sysMessage: '',
    });

    // useEffect hook to fetch the aircraft data when the id changes
    useEffect(() => {
        // If an id is present, start loading and fetch the aircraft data
        if (id) {
            setState(prevState => ({...prevState, isLoading: true}));
            axios.get(`${process.env.STRAPI_API_URL}/aircrafts/${id}?populate=*`)
                .then(response => {
                    // If data is returned, update the aircraft state
                    if (response.data.data) {
                        setState(prevState => ({...prevState, aircraft: response.data.data}));
                    } else {
                        setState(prevState => ({...prevState, sysMessage: 'No data found'}));
                    }
                })
                .catch(error => {
                    // If an error occurs, log it and set a system message
                    console.error('Error fetching aircraft details:', error);
                    setState(prevState => ({...prevState, sysMessage: 'An error occurred while fetching data'}));
                })
                .finally(() => {
                    // Finally, stop loading
                    setState(prevState => ({...prevState, isLoading: false}));
                });
        }
    }, [id]);

    useEffect(() => {
        if (state.aircraft) {
            const imageUrl = state.aircraft.attributes.image?.data?.attributes?.url;
            if (imageUrl) {
                MetaDataReader(imageUrl)
                    .then(data => {
                        setState(prevState => ({...prevState, metaData: data}));
                    })
                    .catch(error => console.error('Error fetching EXIF data:', error));
            }
        }
    }, [state.aircraft]);

    // Render loading, error, or no data states
    if (state.isLoading) {
        return <div>Loading aircraft details...</div>;
    }

    if (state.sysMessage) {
        return (
            <div>
                <p>{state.sysMessage}</p>
                <Link href="/gallery">{t("back")}</Link>
            </div>
        );
    }

    if (!state.aircraft) {
        return <div>No aircraft details available.</div>;
    }

    // Extract the aircraft attributes for easier access
    const {attributes} = state.aircraft;
    const imageUrl = attributes.image?.data?.attributes?.url;
    const aircraftType = attributes.type?.data?.attributes?.label;
    const operator = attributes.operator?.data?.attributes?.label;
    const yearOfFirstFlight = attributes.yearOfFirstFlight ? formatDate(attributes?.yearOfFirstFlight) : 'N/A';
    const serviceNumber = attributes.serviceNumber;
    const registration = attributes.registration;
    const yearOfConstruction = attributes.yearOfConstruction;

    //extract the metadata
    const flash = state.metaData?.Flash?.value?.Fired?.value || 'N/A';
    const iso = state.metaData?.ISOSpeedRatings?.value || 'N/A';
    const model = state.metaData?.Model?.description || 'N/A';
    const modelMaker = state.metaData?.Make?.description || 'N/A';
    const focalNumber = state.metaData?.FNumber?.description || 'N/A';
    const focalLength = state.metaData?.FocalLength?.description || 'N/A';
    const exposureTime = state.metaData?.ExposureTime?.description || 'N/A';
    const artist = state.metaData?.Artist?.description || 'Laurent Greder';
    const copyright = state.metaData?.Copyright?.description || 'All Right Reserved';
    const creationDate = formatDate(state.metaData?.CreateDate?.value || 'N/A');

    // Render the aircraft details and image overlay
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="grid md:grid-cols-2 gap-8">
                    <header className="w-full h-auto">
                        <img
                            src={imageUrl || notFound}
                            alt={aircraftType || 'Not found'}
                            className="w-full h-auto object-cover rounded-lg shadow-lg"
                        />
                    </header>
                    <main className="flex flex-col gap-6">
                        <div className="flex justify-between items-center">
                            <Link href="/gallery"
                                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                {t("back")}
                            </Link>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">{aircraftType || 'N/A'}</h2>
                            <p className="text-2xl font-semibold text-slate-600">{operator || 'N/A'}</p>
                            <hr className="my-4 border-t-2 w-56 border-gray-300"/>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="text-xl font-semibold mb-4">{t("aircraftDetails")}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <DetailItem label={t("yearOfFirstFlight")} value={yearOfFirstFlight}/>
                                <DetailItem label={t("yearOfConstruction")} value={yearOfConstruction}/>
                                <DetailItem label={t("serviceNumber")} value={serviceNumber}/>
                                <DetailItem label={t("registration")} value={registration}/>
                            </div>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-xl font-semibold px-6 py-4">
                                    {t("imageDetails")}
                                </AccordionTrigger>
                                <AccordionContent className="p-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <ImageDetailItem icon={<MdCameraAlt className="size-7"/>} label={model}
                                                         subLabel={modelMaker}/>
                                        <ImageDetailItem icon={<MdCamera className="size-7"/>} label={t("aperture")}
                                                         value={focalNumber}/>
                                        <ImageDetailItem icon={<MdAccessAlarm className="size-7"/>}
                                                         label={t("exposureTime")} value={exposureTime}/>
                                        <ImageDetailItem icon={<MdIso className="size-7"/>} label="ISO" value={iso}/>
                                        <ImageDetailItem
                                            icon={flash === 'true' ? <MdFlashOn className="size-7"/> :
                                                <MdFlashOff className="size-7"/>}
                                            label={t("flash")}
                                            value={flash === 'true' ? t("flashTriggered") : t("flashNotTriggered")}
                                        />
                                        <ImageDetailItem icon={<MdBlurOn className="size-7"/>} label={t("focalLength")}
                                                         value={focalLength}/>
                                        <ImageDetailItem icon={<MdCalendarMonth className="size-7"/>}
                                                         label={t("creationDate")} value={creationDate}/>
                                    </div>
                                    <div className="mt-6 text-sm text-gray-600">
                                        <p>&copy; {copyright}</p>
                                        <p>{artist}</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </main>
                </div>
            </div>
        </>
    );
}
