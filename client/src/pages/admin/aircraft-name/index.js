import {useEffect , useState} from 'react';
import axios from 'axios';
import Link from "next/link";

export default function Index() {
    const [ aircraftNames , setaircraftNames ] = useState ( [] );

    useEffect ( () => {
        axios.get ( 'http://localhost:8000/api/aircraft-name' )
            .then ( response => {
                setaircraftNames ( response.data );
                console.log ( response.data)
            } )
            .catch ( error => {
                console.error ( 'Error fetching aircraft-names:' , error );
            } );
    } , [] );

    return (
        <div>
            <h1>aircraft-names</h1>
            <ul>
                {aircraftNames.map ( aircraftName => (
                    <li key={aircraftName._id}>
                        <Link href={`aircraft-name/${aircraftName._id}/edit`}>
                            {aircraftName.name}
                        </Link>
                    </li>
                ) )}
            </ul>
            <div>
                <Link href="/admin/aircraft-name/add">
                    Add aircraft-name
                </Link>
                <Link href="/admin/">
                    Back to Admin
                </Link>
            </div>
        </div>
    );
}
