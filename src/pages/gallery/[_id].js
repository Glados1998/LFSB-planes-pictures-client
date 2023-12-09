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
        <div >
            <div>
                <img src={aircraft.image} alt={`Aircraft ${aircraft.aircraft_identification.registry}`}/>
            </div>
            <div >
                <div >
                    <p >{aircraft.aircraft_name.name} - {aircraft.operator.name}</p>
                    <p ><strong>Registry:</strong> {aircraft.aircraft_identification.registry}</p>
                    <p ><strong>Serial Number:</strong> {aircraft.aircraft_identification.serial_number}</p>
                    <p ><strong>Aircraft Type:</strong> {aircraft.aircraft_type}</p>
                    <p ><strong>Year of manufacturing:</strong> {aircraft.year_of_manufacturing}</p>
                    <p ><strong>Year of first flight:</strong> {aircraft.year_of_first_flight}</p>
                </div>
                <div>
                    <Link href="/gallery">
                        Gallery
                    </Link>
                </div>
            </div>
        </div>
    );
}
