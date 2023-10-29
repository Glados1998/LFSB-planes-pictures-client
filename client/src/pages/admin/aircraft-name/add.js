import axios from 'axios';
import {useRouter} from "next/router";
import Link from "next/link";

export default function AddAircraftName() {

    const router = useRouter ();
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Assuming you have state set up for the operator name.
        const operatorData = {
            name: e.target.name.value,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/aircraft-name/create', operatorData);
            if (response.status === 201) {
                console.log ("Aircraft-name added successfully")
                await router.push ( '/admin/aircraft-name/' )
            }
        } catch (error) {
            console.error("Failed to add operator", error);
        }
    };

    return (
        <div>
            <h1>Add New Aircraft-name</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Aircraft-name Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <button type="submit">Add Aircraft-name</button>
            </form>
            <Link href="/admin/aircraft-name">
                Aircraft-name List
            </Link>
        </div>
    );
}
