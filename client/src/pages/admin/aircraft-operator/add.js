import axios from 'axios';
import {useRouter} from "next/router";
import Link from "next/link";

export default function AddOperator() {

    const router = useRouter ();
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Assuming you have state set up for the operator name.
        const operatorData = {
            name: e.target.name.value,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/operator/create', operatorData);
            if (response.status === 201) {
                console.log ("Operator added successfully")
                await router.push ( '/admin/aircraft-operator/' )
            }
        } catch (error) {
            console.error("Failed to add operator", error);
        }
    };

    return (
        <div>
            <h1>Add New Operator</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Operator Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <button type="submit">Add Operator</button>
            </form>
            <Link href="/admin/aircraft-operator">
                Operator List
            </Link>
        </div>
    );
}
