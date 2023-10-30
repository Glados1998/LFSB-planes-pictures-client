import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from "next/link";

export default function AircraftDetail() {
    const router = useRouter();
    const { _id } = router.query;

    const [aircraft, setAircraft] = useState(null);

    useEffect(() => {
        if (_id) {  // only fetch if id is available
            axios.get(`http://localhost:8000/api/aircraft/${_id}`)
                .then(response => {
                    setAircraft(response.data);
                    console.log ( response.data)
                })
                .catch(error => {
                    console.error('Error fetching aircraft details:', error);
                });
        }
    }, [_id]);

    if (!aircraft) return <div>Loading...</div>;

    return (
        <div className={'grid grid-cols-2 gap-20'}>
            <div>
                <img src={aircraft.image} alt={`Aircraft ${aircraft.aircraft_identification.registry}`} className={'rounded-md shadow-md'}/>
            </div>
            <div className={'grid grid-flow-row'}>
                <div className={'grid grid-flow-row gap-1.5'}>
                    <p className={'font-bold text-4xl mb-3'}>{aircraft.aircraft_name.name} - {aircraft.operator.name}</p>
                    <p className={'text-2xl'}><strong>Registry:</strong> {aircraft.aircraft_identification.registry}</p>
                    <p className={'text-2xl'}><strong>Serial Number:</strong> {aircraft.aircraft_identification.serial_number}</p>
                    <p className={'text-2xl'}><strong>Aircraft Type:</strong> {aircraft.aircraft_type}</p>
                    <p className={'text-2xl'}><strong>Year of manufacturing:</strong> {aircraft.year_of_manufacturing}</p>
                    <p className={'text-2xl'}><strong>Year of first flight:</strong> {aircraft.year_of_first_flight}</p>
                </div>
                <div>
                    <Link href="/gallery" className={'rounded-md text-xl bg-blue-500 text-white font-medium text-md p-1 hover:shadow-md hover:bg-blue-600'}>
                        Gallery
                    </Link>
                </div>
            </div>
        </div>
    );
}
