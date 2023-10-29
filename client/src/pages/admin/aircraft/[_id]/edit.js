import {useEffect , useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import Link from "next/link";
import {toBase64} from "@/utils/imageConversion";

export default function Edit() {
    const router = useRouter ();

    const { _id } = router.query;
    const [ aircraft , setAircraft ] = useState ( null );
    const [ operators , setOperators ] = useState ( [] );
    const [ aircraftNames , setAircraftNames ] = useState ( [] );
    const [ imagePreview , setImagePreview ] = useState ( null );


    useEffect ( () => {
        if ( _id ) {
            // Fetch aircraft
            axios.get ( `http://localhost:8000/api/aircraft/${_id}` )
                .then ( response => {
                    setAircraft ( response.data );
                    console.log ( response.data )
                    setImagePreview ( response.data.image );
                } )
                .catch ( error => {
                    console.error ( 'Error fetching operator:' , error );
                } );
        }
        // Fetch operators for dropdown
        axios.get ( 'http://localhost:8000/api/operator')
            .then ( response => {
                setOperators ( response.data );
            } ).catch ( error => {
            console.error ( 'Error fetching operators:' , error );
        } );

        axios.get ( 'http://localhost:8000/api/aircraft-name' )
            .then ( response => {
                setAircraftNames ( response.data );
            } )
            .catch ( error => {
                console.error ( 'Error fetching aircraft-names:' , error );
            } );

    } , [ _id ] );

    const handleSubmit = async (e) => {
        e.preventDefault ();

        const imageFile = e.target.image.files[0];
        const encodedImage = imageFile ? await toBase64 ( imageFile ) : aircraft.image;

        const aircraftData = {
            image : encodedImage ,
            operator : e.target.operator.value ,
            aircraft_name : e.target.aircraft_name.value ,
            aircraft_type : e.target.aircraft_type.value ,
            year_of_manufacturing : e.target.year_of_manufacturing.value ,
            year_of_first_flight : e.target.year_of_first_flight.value ,
            aircraft_identification : {
                registry : e.target.registry.value ,
                serial_number : e.target.serial_number.value
            }
        };

        try {
            const response = await axios.put ( `http://localhost:8000/api/aircraft/${_id}/edit` , aircraftData );
            if ( response.status === 200 ) {
                await router.push ( '/admin/aircraft/' )
            }
            console.log ( response.data ); // Handle the response as desired
        } catch (error) {
            console.error ( "Failed to update aircraft" , error );
        }
    }


    const handleDelete = () => {
        axios.delete ( `http://localhost:8000/api/aircraft/${_id}/delete` )
            .then ( response => {
                router.push ( '/admin/aircraft/' )
            } )
            .catch ( error => {
                console.error ( 'Error deleting operator:' , error );
            } );
    }

    const handleImageChange = async (e) => {
        if ( e.target.files && e.target.files[0] ) {
            const imageFile = e.target.files[0];
            const encodedImage = await toBase64 ( imageFile );
            setImagePreview ( encodedImage );
        }
    };

    return (
        <div>
            <h1>Edit Aircraft - {_id}</h1>
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth : '200px' }}/>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Image</label>
                    <input type="file" name="image" onChange={handleImageChange}/></div>
                <div>
                    <label htmlFor="operator">Operator:</label>
                    <select id="operator" name="operator" required defaultValue={aircraft?.operator?._id}>
                        {operators.map ( operator => (
                            <option key={operator._id} value={operator._id}>
                                {operator.name}
                            </option>
                        ) )}
                    </select>
                </div>
                <div>
                    <label htmlFor="aircraft_name">Aircraft name:</label>
                    <select id="aircraft_name" name="aircraft_name" required
                            defaultValue={aircraft?.aircraft_name?._id}>
                        {aircraftNames.map ( aircraftName => (
                            <option key={aircraftName._id} value={aircraftName._id}>
                                {aircraftName.name}
                            </option>
                        ) )}
                    </select>
                </div>
                <div>
                    <label htmlFor="aircraft_type">Aircraft type:</label>
                    <select id="aircraft_type" name="aircraft_type" required defaultValue={aircraft?.aircraft_type}>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="year_of_manufacturing">Year of Manufacturing:</label>
                    <input type="date" id="year_of_manufacturing" name="year_of_manufacturing" required
                           defaultValue={aircraft?.year_of_manufacturing}/>
                </div>
                <div>
                    <label htmlFor="year_of_first_flight">Year of First Flight:</label>
                    <input type="date" id="year_of_first_flight" name="year_of_first_flight" required
                           defaultValue={aircraft?.year_of_first_flight}/>
                </div>
                <div>
                    <label htmlFor="registry">Registry:</label>
                    <input type="text" id="registry" name="registry" required
                           defaultValue={aircraft?.aircraft_identification.registry}/>
                </div>
                <div>
                    <label htmlFor="serial_number">Serial Number:</label>
                    <input type="text" id="serial_number" name="serial_number" required
                           defaultValue={aircraft?.aircraft_identification.serial_number}/>
                </div>

                <button type="submit">Update Aircraft</button>
            </form>
            <button onClick={handleDelete}>Delete Aircraft</button>
            <Link href="/admin/aircraft">
                Aircraft list
            </Link>
        </div>
    );
}
