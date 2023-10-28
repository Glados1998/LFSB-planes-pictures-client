import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Add(props) {
    const [name, setName] = useState('');
    const id = props.match.params.id; // Assumes you're using react-router

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/operator/${id}`)
                .then(response => {
                    setName(response.data.name);
                })
                .catch(error => {
                    console.error('Error fetching operator:', error);
                });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const method = id ? 'put' : 'post';
        const endpoint = id ? `/operator/${id}/edit` : '/operator/create';

        axios[method](endpoint, { name })
            .then(response => {
                console.log(response.data); // Handle the response as desired
            })
            .catch(error => {
                console.error('Error saving operator:', error);
            });
    };

    return (
        <div>
            <h1>{id ? 'Edit Operator' : 'Add Operator'}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <button type="submit">{id ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}
