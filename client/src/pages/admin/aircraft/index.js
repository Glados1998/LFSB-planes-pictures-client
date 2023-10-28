import {useEffect , useState} from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function AircraftIndex() {
    const [ aircrafts , setAircrafts ] = useState ( [] );

    useEffect ( () => {
        axios.get ( 'http://localhost:8000/api/aircraft' )
            .then ( response => {
                setAircrafts ( response.data );
                console.log ( response.data );
            } )
            .catch ( error => {
                console.error ( 'Error fetching aircrafts:' , error );
            } );
    } , [] );

    return (
        <div>
            <h1>Aircrafts</h1>
            <ul>
                {aircrafts.map ( aircraft => (
                    <li key={aircraft._id}>
                        <Link href={`aircraft/${aircraft._id}/edit`}>
                            {aircraft.aircraft_identification.registry} - {aircraft.aircraft_identification.serial_number} - {aircraft.operator.name}
                        </Link>
                    </li>
                ) )}
            </ul>
            <Link href="/admin/aircraft/add">Add Aircraft</Link>
            <Link href="/admin/">
                Back to Admin
            </Link>
        </div>
    );
}
