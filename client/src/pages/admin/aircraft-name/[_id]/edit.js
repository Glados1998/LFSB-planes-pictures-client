import {useRouter} from 'next/router';
import axios from 'axios';
import {useEffect , useState} from "react";
import Link from "next/link";

export default function EditAircraftName() {
    const router = useRouter ();

    const { _id } = router.query;
    const [ operator , setOperator ] = useState ( null );

    useEffect ( () => {
        if ( _id ) {
            axios.get ( `http://localhost:8000/api/aircraft-name/${_id}` )
                .then ( response => {
                    setOperator ( response.data );
                } )
                .catch ( error => {
                    console.error ( 'Error fetching operator:' , error );
                } );
        }
    } , [ _id ] );

    const handleSubmit = async (e) => {
        e.preventDefault ();

        const operatorData = {
            name : e.target.name.value ,
        };

        try {
            const response = await axios.put ( `http://localhost:8000/api/aircraft-name/${_id}/edit` , operatorData );
            if ( response.status === 200 ) {
                await router.push ( '/admin/aircraft-name/' )
            }
        } catch (error) {
            console.error ( "Failed to update operator" , error );
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete ( `http://localhost:8000/api/aircraft-name/${_id}/delete` );
            if ( response.status === 200 ) {
                await router.push ( '/admin/aircraft-name/' )
            }
        } catch (error) {
            console.error ( "Failed to delete operator" , error );
        }
    };

    return (
        <div>
            <h1>Edit Aircraft name - {_id}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Aircraft name:</label>
                    <input type="text" id="name" name="name" required defaultValue={operator?.name}/>
                </div>
                <button type="submit">Update Aircraft name</button>
            </form>
            <button onClick={handleDelete}>Delete Aircraft name</button>
            <Link href="/admin/aircraft-operator">
                Aircraft name List
            </Link>
        </div>
    );
}
