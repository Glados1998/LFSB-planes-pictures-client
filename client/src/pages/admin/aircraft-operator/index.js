import {useEffect , useState} from 'react';
import axios from 'axios';
import Link from "next/link";

export default function Index() {
    const [ operators , setOperators ] = useState ( [] );

    useEffect ( () => {
        axios.get ( 'http://localhost:8000/api/operator' )
            .then ( response => {
                setOperators ( response.data );
            } )
            .catch ( error => {
                console.error ( 'Error fetching operators:' , error );
            } );
    } , [] );

    return (
        <div>
            <h1>Operators</h1>
            <ul>
                {operators.map ( operator => (
                    <li key={operator._id}>
                        <Link href={`aircraft-operator/${operator._id}/edit`}>
                            {operator.name}
                        </Link>
                    </li>
                ) )}
            </ul>
            <div>
                <Link href="/admin/aircraft-operator/add">
                    Add Operator
                </Link>
                <Link href="/admin/">
                    Back to Admin
                </Link>
            </div>
        </div>
    );
}
