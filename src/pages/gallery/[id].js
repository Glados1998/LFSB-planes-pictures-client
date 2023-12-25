import {useRouter} from 'next/router';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import formatDate from "@/utils/timestamp-format";
import {notFound} from "@/assets/images/imageNotFound.jpg";

export default function AircraftDetail() {
    const router = useRouter();
    const {id} = router.query;

    const [aircraft, setAircraft] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sysMessage, setSysMessage] = useState('');

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            axios.get(`https://strapi-production-1911.up.railway.app/api/aircrafts/${id}?populate=*`)
                .then(response => {
                    if (response.data.data) {
                        setAircraft(response.data.data);
                    } else {
                        setSysMessage('No data found');
                    }
                })
                .catch(error => {
                    console.error('Error fetching aircraft details:', error);
                    setSysMessage('An error occurred while fetching data');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [id]);

    if (isLoading) {
        return <div>Loading aircraft details...</div>;
    }

    if (sysMessage) {
        return (
            <div>
                <p>{sysMessage}</p>
                <Link href="/gallery">Return to gallery</Link>
            </div>
        );
    }

    if (!aircraft) {
        return <div>No aircraft details available.</div>;
    }

    const {attributes} = aircraft;
    const imageUrl = attributes.image?.data?.attributes?.formats?.large?.url;
    const aircraftType = attributes.type?.data?.attributes?.label;
    const operator = attributes.operator?.data?.attributes?.label;
    const yearOfFirstFlight = formatDate(attributes?.yearOfFirstFlight) ;
    const serviceNumber = attributes.serviceNumber;
    const registration = attributes.registration;
    const yearOfConstruction = attributes.yearOfConstruction;
    const publishedAt = formatDate(attributes?.publishedAt);


    return (
        <div className={'detail'}>
            {imageUrl && (
                <div className={'detail__image'}>
                    <Image src={imageUrl || notFound} alt={aircraftType || 'Aircraft'} width={700} height={500}/>
                </div>
            )}
            <div className={'detail__content'}>
                {aircraftType && (
                    <div className={'detail__content-title'}>
                        <h2>{aircraftType}</h2>
                        <p>{operator || 'N/A'}</p>
                    </div>
                )}
                <div className={'detail__content-info'}>
                    <p>Année du premier vol : {yearOfFirstFlight || 'N/A'}</p>
                    <p>Numéro de service : {serviceNumber || 'N/A'}</p>
                    <p>Immatriculation : {registration || 'N/A'}</p>
                    <p>Année de construction : {yearOfConstruction || 'N/A'}</p>
                    <p>Publié le: {publishedAt}</p>
                </div>
                <div className={'detail__content-footer'}>
                    <Link href="/gallery">
                        Retour à la galerie
                    </Link>
                </div>
            </div>
        </div>
    );
}
