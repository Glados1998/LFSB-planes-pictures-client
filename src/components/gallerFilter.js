import {useEffect, useState} from "react";
import axios from 'axios';

export default function GalleryFilter({onFilterChange, dataPresent}) {
    const [operators, setOperators] = useState([]);
    const [aircraftTypes, setAircraftTypes] = useState([]);

    useEffect(() => {
        const fetchOperators = axios.get('https://strapi-production-1911.up.railway.app/api/operators');
        const fetchAircraftTypes = axios.get('https://strapi-production-1911.up.railway.app/api/aircarft-types');

        Promise.all([fetchOperators, fetchAircraftTypes])
            .then(([operatorsResponse, aircraftTypesResponse]) => {
                setOperators(operatorsResponse.data.data.sort((a, b) => a.attributes.label.localeCompare(b.attributes.label)));
                setAircraftTypes(aircraftTypesResponse.data.data.sort((a, b) => a.attributes.label.localeCompare(b.attributes.label)));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className={'filter'}>
            <div className={'filter_input operator'}>
                <label>Compagnie aérienne:</label>
                <select onChange={e => onFilterChange('operator', e.target.value)} disabled={!dataPresent}>
                    <option value="">Compagnie aérienne</option>
                    {operators.map(operator => (
                        <option key={operator.id} value={operator.id}>{operator.attributes.label}</option>
                    ))}
                </select>
            </div>
            <div className={'filter_input aircraft-name'}>
                <label>Type d'avion:</label>
                <select onChange={e => onFilterChange('type', e.target.value)} disabled={!dataPresent}>
                    <option value="">Select Aircraft Type</option>
                    {aircraftTypes.map(aircraftType => (
                        <option key={aircraftType.id} value={aircraftType.id}>{aircraftType.attributes.label}</option>
                    ))}
                </select>
            </div>
            <div className={'filter_input registration'}>
                <label>Immatriculation :</label>
                <input type={'text'} onChange={e => onFilterChange('registration', e.target.value)}
                       disabled={!dataPresent} placeholder={"Immatriculation"}/>
            </div>
        </div>
    );
}
