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
import Image from "next/image";
import formatDate from "@/utils/timeStampFormat";
import notFound from "@/assets/images/imageNotFound.jpg";
import ImageOverlay from "@/components/image-overlay";
import MetaDataReader from "@/utils/metaDataReader";
import Accordion from "@/components/accordion";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";
import {MdAccessAlarm, MdCamera, MdCameraAlt} from "react-icons/md";

export default function AircraftDetail() {
    // Use the Next.js router to get the id from the query
    const router = useRouter();
    const {id} = router.query;

    // State variable for the aircraft data, loading state, system message, and overlay visibility
    const [state, setState] = useState({
        aircraft: null,
        metaData: null,
        isLoading: true,
        sysMessage: '',
        showOverlay: false
    });

    // useEffect hook to fetch the aircraft data when the id changes
    useEffect(() => {
        // If an id is present, start loading and fetch the aircraft data
        if (id) {
            setState(prevState => ({...prevState, isLoading: true}));
            axios.get(`https://strapi-production-1911.up.railway.app/api/aircrafts/${id}?populate=*`)
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
            console.log(imageUrl)
            if (imageUrl) {
                MetaDataReader(imageUrl)
                    .then(data => {
                        setState(prevState => ({...prevState, metaData: data}));
                    })
                    .catch(error => console.error('Error fetching EXIF data:', error));
            }
        }
    }, [state.aircraft]);

    useEffect(() => {
        console.log('Updated metaData:', state.metaData);
    }, [state.metaData]);

    // Render loading, error, or no data states
    if (state.isLoading) {
        return <div>Loading aircraft details...</div>;
    }

    if (state.sysMessage) {
        return (
            <div>
                <p>{state.sysMessage}</p>
                <Link href="/gallery">Retour à la galerie</Link>
            </div>
        );
    }

    if (!state.aircraft) {
        return <div>No aircraft details available.</div>;
    }

    // Extract the aircraft attributes for easier access
    const {attributes} = state.aircraft;
    const imageUrl = attributes.image?.data?.attributes?.formats?.large?.url;
    const aircraftType = attributes.type?.data?.attributes?.label;
    const operator = attributes.operator?.data?.attributes?.label;
    const yearOfFirstFlight = formatDate(attributes?.yearOfFirstFlight);
    const serviceNumber = attributes.serviceNumber;
    const registration = attributes.registration;
    const yearOfConstruction = attributes.yearOfConstruction;

    //extract the metadata
    const flash = state.metaData?.Flash?.description || 'N/A';
    const iso = state.metaData?.ISOSpeedRatings?.value || 'N/A';
    const model = state.metaData?.Model?.description || 'N/A';
    const modelMaker = state.metaData?.Make?.description || 'N/A';
    const focalNumber = state.metaData?.FNumber?.description || 'N/A';
    const focalLength = state.metaData?.FocalLength?.description || 'N/A';
    const exposureTime = state.metaData?.ExposureTime?.description || 'N/A';
    const artist = state.metaData?.Artist?.description || 'Laurent Greder';
    const copyright = state.metaData?.Copyright?.description || 'All Right Reserved';

    // Render the aircraft details and image overlay
    return (
        <>
            <div className={'detail'}>
                <div className={'detail__image'}>
                    {/* Image that opens the overlay when clicked */}
                    <Image src={imageUrl || notFound} alt={aircraftType || 'Not found'} width={700} height={500}
                           onClick={() => setState(prevState => ({...prevState, showOverlay: true}))}/>
                </div>
                <div className={'detail__content'}>
                    <div className={'detail__content-title'}>
                        <h2>{aircraftType || 'N/A'}</h2>
                        <p>{operator || 'N/A'}</p>
                    </div>
                    <div className={'detail__content-info'}>
                        <Accordion
                            controllerElement={(isExpanded) => (
                                <span>
                                    {isExpanded ? <FaArrowUp/> : <FaArrowDown/>} Détails de l'appareil
                                </span>
                            )}
                        >
                            <p>Date du premier vol : {yearOfFirstFlight || 'N/A'}</p>
                            <p>Année de construction : {yearOfConstruction || 'N/A'}</p>
                            <p>Numéro de service : {serviceNumber || 'N/A'}</p>
                            <p>Immatriculation : {registration || 'N/A'}</p>
                        </Accordion>
                        <Accordion
                            controllerElement={(isExpanded) => (
                                <span>
                                    {isExpanded ? <FaArrowUp/> : <FaArrowDown/>} Détails de l'image
                                </span>
                            )}
                        >
                            <div className="image-metadata-container">
                                <div className="image-metadata-container-header">
                                    <i title={'camera'}>
                                        <MdCameraAlt/>
                                    </i>
                                    <div className="image-metadata-container-header-camera">
                                        <h3>
                                            {model}
                                        </h3>
                                        <span>
                                        {modelMaker}
                                    </span>
                                    </div>
                                </div>
                                <div className="image-metadata-container-content">
                                    <div className="image-metadata-container-content-column">
                                        <div className="image-metadata-container-content-column-item">
                                            <i title={'Ouverture'}>
                                                <MdCamera/>
                                            </i>
                                            <span>{focalNumber}</span>
                                        </div>
                                        <div className="image-metadata-container-content-column-item">
                                            <i title={'Ouverture'}>
                                                <MdAccessAlarm/>
                                            </i>
                                            <span>{exposureTime}</span>
                                        </div>
                                    </div>
                                    <div className="image-metadata-container-content-column">
                                        colonne 2
                                    </div>
                                    <div className="image-metadata-container-content-column">
                                        colonne 3
                                    </div>
                                </div>
                            </div>
                        </Accordion>

                    </div>
                    <div className={'detail__content-footer'}>
                        <Link href="/gallery">
                            Retour à la galerie
                        </Link>
                    </div>
                </div>
            </div>
            {/* Image overlay that can be closed by clicking the close button */}
            {state.showOverlay && (
                <ImageOverlay imageUrl={imageUrl}
                              onClose={() => setState(prevState => ({...prevState, showOverlay: false}))}/>
            )}
        </>
    );
}