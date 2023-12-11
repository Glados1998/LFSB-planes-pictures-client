import {useRouter} from 'next/router';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import formatDate from "@/utils/timestamp-format";

export default function AircraftDetail() {
    const router = useRouter();
    const {id} = router.query;

    const [aircraft, setAircraft] = useState(null);

    useEffect(() => {
        console.log('id', id)
        if (id) {
            axios.get(`https://strapi-production-1911.up.railway.app/api/aircrafts/${id}?populate=*`)
                .then(response => {
                    setAircraft(response.data.data);
                    console.log(response.data)
                })
                .catch(error => {
                    console.error('Error fetching aircraft details:', error);
                });
        }
    }, [id]);

    if (!aircraft) return <div>Loading...</div>;

    return (
        <div className={'detail'}>
            <div className={'detail__image'}>
                <Image src={aircraft.attributes.image.data.attributes.formats.large.url}
                       alt={aircraft.attributes.type.data.attributes.label} width={700} height={500}/>
            </div>
            <div className={'detail__content'}>
                <div className={'detail__content-title'}>
                    <h2>{aircraft.attributes.type.data.attributes.label}</h2>
                    <span>/</span>
                    <p>{aircraft.attributes.operator.data.attributes.label}</p>
                </div>
                <div className={'detail__content-info'}>
                    <p>Year of first flight: {formatDate(aircraft.attributes.yearOfFirstFlight)}</p>
                    <p>Serial Number: {aircraft.attributes.serviceNumber}</p>
                    <p>Year of construction: {aircraft.attributes.yearOfConstruction}</p>
                    <p>Published: {formatDate(aircraft.attributes.publishedAt)}</p>
                </div>
                <div className={'detail__content-footer'}>
                    <Link href="/gallery">
                        Back to gallery
                    </Link>
                </div>
            </div>

        </div>
    );
}
