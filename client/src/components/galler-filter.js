import { useState, useEffect } from "react";
import axios from 'axios';

export default function GalleryFilter({ onFilterChange }) {

    const [operators, setOperators] = useState([]);
    const [aircraftNames, setAircraftNames] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:8000/api/operator')
            .then(response => {
                setOperators(response.data);
            })
            .catch(error => {
                console.error('Error fetching operators:', error);
            });

        axios.get('http://localhost:8000/api/aircraft-name')
            .then(response => {
                setAircraftNames(response.data);
            })
            .catch(error => {
                console.error('Error fetching aircraft-names:', error);
            });
    }, []);

    return (
        <div className={'grid grid-flow-col mb-3'}>
            <div>
                <label className={'font-bold text-base'}>Operator:</label>
                <select className={'rounded-md bg-gray-200 p-1'} onChange={e => onFilterChange('operator', e.target.value)}>
                    <option value="">Operator</option>
                    {operators.map(operator => (
                        <option key={operator._id} value={operator._id}>{operator.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className={'font-bold text-base'}>Aircraft Name:</label>
                <select className={'rounded-md bg-gray-200 p-1'} onChange={e => onFilterChange('aircraftName', e.target.value)}>
                    <option value="">Aircraft Name</option>
                    {aircraftNames.map(aircraftName => (
                        <option key={aircraftName._id} value={aircraftName._id}>{aircraftName.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className={'font-bold text-base'}>Aircraft Type:</label>
                <select className={'rounded-md bg-gray-200 p-1'} onChange={e => onFilterChange('aircraftType', e.target.value)}>
                    <option value="">Select Aircraft Type</option>
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                </select>
            </div>
            <div>
                <label className={'font-bold text-base'}>Registry:</label>
                <input className={'rounded-md bg-gray-200 p-1 w-32'} type="text" onChange={e => onFilterChange('registry', e.target.value)} />
            </div>
            <div>
                <label className={'font-bold text-base'}>Serial Number:</label>
                <input className={'rounded-md bg-gray-200 p-1 w-32'} type="text" onChange={e => onFilterChange('serialNumber', e.target.value)} />
            </div>
        </div>
    );
}
