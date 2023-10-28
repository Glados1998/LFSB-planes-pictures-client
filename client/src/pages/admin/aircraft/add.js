import axios from 'axios';
import {useEffect , useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {toBase64} from "@/utils/imageConversion"

export default function AddAircraft() {

    const router = useRouter ();
    const [operators, setOperators] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/operator')
            .then(response => {
                setOperators(response.data);
            })
            .catch(error => {
                console.error('Error fetching operators:', error);
            });
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault ();
        const imageFile = e.target.image.files[0];
        const encodedImage = await toBase64(imageFile);

        const aircraftData = {
            image : encodedImage ,
            operator : e.target.operator.value ,
            year_of_manufacturing : e.target.year_of_manufacturing.value ,
            year_of_first_flight : e.target.year_of_first_flight.value ,
            aircraft_identification : {
                registry : e.target.registry.value ,
                serial_number : e.target.serial_number.value
            }
        };

        try {
            const response = await axios.post ( 'http://localhost:8000/api/aircraft/create' , aircraftData );
            if ( response.status === 201 ) {
                await router.push ( '/admin/aircraft/' )
            }
        } catch (error) {
            console.error ( "Failed to add aircraft" , error );
        }
    };

    return (
        <div>
            <h1>Add Aircraft</h1>
            {imagePreview && <img src={imagePreview} alt="Aircraft Preview" style={{ width: '200px', marginTop: '10px' }} />}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Image</label>
                    <input type="file" name="image" required onChange={e => setImagePreview(URL.createObjectURL(e.target.files[0]))} />                </div>
                <div>
                    <label htmlFor="operator">Operator:</label>
                    <select id="operator" name="operator" required>
                        {operators.map(operator => (
                            <option key={operator._id} value={operator._id}>
                                {operator.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Year of Manufacturing</label>
                    <input type="date" name="year_of_manufacturing" required/>
                </div>
                <div>
                    <label>Year of First Flight</label>
                    <input type="date" name="year_of_first_flight" required/>
                </div>
                <div>
                    <label>Registry</label>
                    <input type="text" name="registry" required/>
                </div>
                <div>
                    <label>Serial Number</label>
                    <input type="text" name="serial_number" required/>
                </div>
                <button type="submit">Add Aircraft</button>
            </form>
            <Link href="/admin/aircraft">
                Aircraft list
            </Link>
        </div>
    );
}
