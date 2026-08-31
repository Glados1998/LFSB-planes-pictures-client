/**
 * AircraftDetail is a React component that fetches and displays details of a specific aircraft.
 * It fetches the aircraft data from an API based on the id from the router query.
 * It also handles loading and error states, and displays an overlay when the aircraft image is clicked.
 *
 * @component
 */
import {useRouter} from 'next/router';
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
    MdClose,
    MdFlashOff,
    MdFlashOn,
    MdIso
} from "react-icons/md";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {useTranslations} from "next-intl";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {apiClient, isRequestCanceled} from "@/lib/apiClient";
import Image from "next/image";
import Head from "next/head";

/**
 * Fetches the translation messages for the current locale.
 * Used by Next.js for static generation.
 *
 * @param {object} context - The Next.js context object containing locale info.
 * @returns {Promise<{props: {messages: object}}>} The props containing translation messages.
 */
export async function getStaticProps(context) {
    return {
        props: {
            messages: (await import(`messages/${context.locale}.json`)).default
        }
    };
}

/**
 * Defines the static paths for the gallery detail pages.
 * Used by Next.js for static generation.
 *
 * @returns {object} The paths and fallback setting for static generation.
 */
export async function getStaticPaths() {
    return {
        paths: [],
        fallback: "blocking"
    };
}


/**
 * Renders a detail item with a label and value.
 *
 * @param {object} props
 * @param {string} props.label - The label for the detail.
 * @param {string|number} props.value - The value for the detail.
 * @returns {JSX.Element}
 */
const DetailItem = ({label, value}) => (
    <div>
        <p className="font-semibold text-gray-600">{label}:</p>
        <span className="text-gray-800">{value || 'N/A'}</span>
    </div>
);

/**
 * Renders an image detail item with an icon, label, value, and optional sub-label.
 *
 * @param {object} props
 * @param {JSX.Element} props.icon - The icon to display.
 * @param {string} props.label - The main label.
 * @param {string|number} [props.value] - The value to display.
 * @param {string} [props.subLabel] - An optional sub-label.
 * @returns {JSX.Element}
 */
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


/**
 * AircraftDetail is a React component that fetches and displays details of a specific aircraft.
 * It fetches the aircraft data from an API based on the id from the router query.
 * It also handles loading and error states, and displays an overlay when the aircraft image is clicked.
 *
 * @component
 * @returns {JSX.Element}
 */
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
        error: null,
    });

    // useEffect hook to fetch the aircraft data when the id changes
    useEffect(() => {
        if (id) {
            const controller = new AbortController();
            apiClient.get(`/aircrafts/${id}?populate=*`, {signal: controller.signal})
                .then(response => {
                    if (response.data.data) {
                        setState({
                            aircraft: response.data.data,
                            metaData: null,
                            isLoading: false,
                            error: null,
                        });
                    } else {
                        setState({
                            aircraft: null,
                            metaData: null,
                            isLoading: false,
                            error: "notFound",
                        });
                    }
                })
                .catch(error => {
                    if (!isRequestCanceled(error)) {
                        console.error('Error fetching aircraft details:', error);
                        setState({
                            aircraft: null,
                            metaData: null,
                            isLoading: false,
                            error: error?.response?.status === 404 ? "notFound" : "fetchError",
                        });
                    }
                });

            return () => controller.abort();
        }
    }, [id]);

    useEffect(() => {
        if (state.aircraft) {
            const imageUrl = state.aircraft.attributes.image?.data?.attributes?.url;
            if (imageUrl) {
                let isActive = true;
                MetaDataReader(imageUrl)
                    .then(data => {
                        if (isActive) {
                            setState(prevState => ({...prevState, metaData: data}));
                        }
                    })
                    .catch(error => console.error('Error fetching EXIF data:', error));

                return () => {
                    isActive = false;
                };
            }
        }
    }, [state.aircraft]);

    // Render loading, error, or no data states
    if (state.isLoading) {
        return <main className="container mx-auto min-h-48 px-4 py-10" role="status">{t("loading")}</main>;
    }

    if (state.error) {
        return (
            <main className="container mx-auto min-h-48 px-4 py-10">
                <p>{t(state.error)}</p>
                <Link href="/gallery">{t("back")}</Link>
            </main>
        );
    }

    if (!state.aircraft) {
        return <main className="container mx-auto min-h-48 px-4 py-10">{t("notFound")}</main>;
    }

    // Extract the aircraft attributes for easier access
    const {attributes} = state.aircraft;
    const imageUrl = attributes.image?.data?.attributes?.url;
    const aircraftType = attributes.type?.data?.attributes?.label;
    const operator = attributes.operator?.data?.attributes?.label;
    const dateLocales = {fr: "fr-FR", en: "en-GB", de: "de-DE"};
    const dateLocale = dateLocales[router.locale] || "en-GB";
    const dateOfRegistration = formatDate(attributes.dateOfRegistration, dateLocale);
    const serviceNumber = attributes.serviceNumber;
    const registration = attributes.registration;
    const yearOfConstruction = attributes.yearOfConstruction;

    //extract the metadata
    const flashValue = state.metaData?.Flash?.value?.Fired?.value;
    const hasFlashValue = flashValue !== null && flashValue !== undefined;
    const flashWasTriggered = flashValue === true || flashValue === 1 || flashValue === '1' || flashValue === 'true';
    const iso = state.metaData?.ISOSpeedRatings?.value || 'N/A';
    const model = state.metaData?.Model?.description || 'N/A';
    const modelMaker = state.metaData?.Make?.description || 'N/A';
    const focalNumber = state.metaData?.FNumber?.description || 'N/A';
    const focalLength = state.metaData?.FocalLength?.description || 'N/A';
    const exposureTime = state.metaData?.ExposureTime?.description || 'N/A';
    const artist = state.metaData?.Artist?.description || 'Laurent Greder';
    const copyright = state.metaData?.Copyright?.description || 'All Right Reserved';
    const creationDate = formatDate(state.metaData?.CreateDate?.value, dateLocale);

    // Render the aircraft details and image overlay
    return (
        <>
            <Head>
                <title>{registration || aircraftType || t("aircraftDetails")} | LFSB Planes Pictures</title>
                <meta
                    name="description"
                    content={`${aircraftType || "Aircraft"} ${registration || ""} ${operator ? `operated by ${operator}` : ""}`.trim()}
                />
            </Head>
            <main className="container mx-auto px-4 py-10 max-w-7xl">
                <div className="grid md:grid-cols-2 gap-8">
                    <header className="w-full h-auto">
                        <DialogPrimitive.Root>
                            <DialogPrimitive.Trigger asChild>
                                <button
                                    type="button"
                                    aria-label={t("enlargeImage")}
                                    className="block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                                >
                                    <Image
                                        src={imageUrl || notFound}
                                        width={1600}
                                        height={900}
                                        sizes="(min-width: 768px) 50vw, 100vw"
                                        alt={aircraftType || 'Not found'}
                                        className="w-full h-auto object-cover shadow"
                                    />
                                </button>
                            </DialogPrimitive.Trigger>
                            <DialogPrimitive.Portal>
                                <DialogPrimitive.Overlay
                                    className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
                                />
                                <DialogPrimitive.Content
                                    aria-describedby={undefined}
                                    className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
                                >
                                    <DialogPrimitive.Title className="sr-only">
                                        {aircraftType || t("imageDetails")}
                                    </DialogPrimitive.Title>
                                    <Image
                                        src={imageUrl || notFound}
                                        width={1600}
                                        height={900}
                                        sizes="100vw"
                                        alt={aircraftType || 'Not found'}
                                        className="block h-auto max-h-[calc(100vh-2rem)] w-auto max-w-[calc(100vw-2rem)] object-contain shadow-2xl"
                                    />
                                    <DialogPrimitive.Close
                                        aria-label={t("closeImage")}
                                        className="absolute left-3 top-3 flex size-10 items-center justify-center rounded-full bg-black/70 text-white shadow-lg transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                                    >
                                        <MdClose aria-hidden="true" className="size-7"/>
                                    </DialogPrimitive.Close>
                                </DialogPrimitive.Content>
                            </DialogPrimitive.Portal>
                        </DialogPrimitive.Root>
                    </header>
                    <section className="flex flex-col gap-6">
                        <div className="flex justify-between items-center">
                            <Link href="/gallery"
                                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                {t("back")}
                            </Link>
                        </div>
                        {/*<div>
                            <h1 className="text-3xl font-bold">{aircraftType || 'N/A'}</h1>
                            <p className="text-2xl font-semibold text-slate-600">{operator || 'N/A'}</p>
                            <hr className="my-4 border-t-2 w-56 border-gray-300"/>
                        </div>*/}
                        <div className=" bg-slate-100 p-6 shadow">
                            <h3 className="text-xl font-semibold mb-4">{t("aircraftDetails")}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <DetailItem label={t("dateOfRegistration")} value={dateOfRegistration}/>
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
                                            icon={flashWasTriggered ? <MdFlashOn className="size-7"/> :
                                                <MdFlashOff className="size-7"/>}
                                            label={t("flash")}
                                            value={hasFlashValue
                                                ? (flashWasTriggered ? t("flashTriggered") : t("flashNotTriggered"))
                                                : "N/A"}
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
                    </section>
                </div>
            </main>
        </>
    );
}
