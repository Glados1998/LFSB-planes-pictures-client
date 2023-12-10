import {useState, useEffect} from "react";
import axios from 'axios';

export default function GalleryFilter({onFilterChange}) {

    const [operators, setOperators] = useState([]);
    const [aircraftNames, setAircraftNames] = useState([]);

    useEffect(() => {

        axios.get('https://strapi-production-1911.up.railway.app/api/operators')
            .then(response => {
                setOperators(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching operators:', error);
            });

        axios.get('https://strapi-production-1911.up.railway.app/api/aircarft-types')
            .then(response => {
                setAircraftNames(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching aircraft-names:', error);
            });
    }, []);

    return (
        <div>
            <div>
                <label>Operator:</label>
                <select onChange={e => onFilterChange('operator', e.target.value)}>
                    <option value="">Operator</option>
                    {operators.map(operator => (
                        <option key={operator.id} value={operator.id}>{operator.attributes.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Aircraft Name:</label>
                <select onChange={e => onFilterChange('aircraftName', e.target.value)}>
                    <option value="">Aircraft Name</option>
                    {aircraftNames.map(aircraftName => (
                        <option key={aircraftName.id} value={aircraftName.id}>{aircraftName.attributes.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Registry:</label>
                <input type="text" onChange={e => onFilterChange('registry', e.target.value)}/>
            </div>
            <div>
                <label>Serial Number:</label>
                <input type="text" onChange={e => onFilterChange('serialNumber', e.target.value)}/>
            </div>
        </div>
    );
}
