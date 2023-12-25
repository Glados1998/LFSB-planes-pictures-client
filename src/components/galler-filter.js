import {useEffect, useState} from "react";
import axios from 'axios';

export default function GalleryFilter({onFilterChange, dataPresent}) {

    const [operators, setOperators] = useState([]);
    const [aircraftTypes, setAircraftTypes] = useState([]);

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
                setAircraftTypes(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching aircraft-names:', error);
            });
    }, []);

    const handleFilterChange = (filterType, value) => {
        onFilterChange(filterType, value);
    };

    return (
        <div className={'filter'}>
            <div className={'filter_input operator'}>
                <label>Company aérienne:</label>
                <select onChange={e => handleFilterChange('operator', e.target.value)} disabled={!dataPresent}>
                    <option value="">Company aérienne</option>
                    {operators.map(operator => (
                        <option key={operator.id} value={operator.id}>{operator.attributes.label}</option>
                    ))}
                </select>
            </div>
            <div className={'filter_input aircraft-name'}>
                <label>Type d'avion:</label>
                <select onChange={e => handleFilterChange('type', e.target.value)} disabled={!dataPresent}>
                    <option value="">Type d'avion</option>
                    {aircraftTypes.map(aircraftName => (
                        <option key={aircraftName.id} value={aircraftName.id}>{aircraftName.attributes.label}</option>
                    ))}
                </select>
            </div>
            {/*<div className={'filter_input registry'}>
                <label>Registry:</label>
                <input type="text" onChange={e => handleFilterChange('registration', e.target.value)}/>
            </div>
            <div className={'filter_input serial-number'}>
                <label>Service Number:</label>
                <input type="text" onChange={e => handleFilterChange('serviceNumber', e.target.value)}/>
            </div>*/}
        </div>
    );
}
