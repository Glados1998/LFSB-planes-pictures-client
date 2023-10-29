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
        <div>
            <h1>Aircraft Details</h1>
            <img src={aircraft.image} alt={`Aircraft ${aircraft.aircraft_identification.registry}`} style={{ width: '100%' }}/>
            <p><strong>Operator:</strong> {aircraft.operator.name}</p>
            <p><strong>Registry:</strong> {aircraft.aircraft_identification.registry}</p>
            <p><strong>Serial Number:</strong> {aircraft.aircraft_identification.serial_number}</p>
            <p><strong>Aircraft Name:</strong> {aircraft.aircraft_name.name}</p>
            <p><strong>Aircraft Type:</strong> {aircraft.aircraft_type}</p>
            <Link href="/gallery">
                Back to Gallery
            </Link>
        </div>
    );
}
