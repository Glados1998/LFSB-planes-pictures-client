import {useEffect, useState} from "react";
import axios from 'axios';

/**
 * GalleryFilter is a React component that fetches and displays a set of filters for a gallery.
 * It fetches data about operators and aircraft types from an API and provides select inputs for them.
 * It also provides an input for aircraft registration.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onFilterChange - The function to be called when a filter value changes.
 * @param {boolean} props.dataPresent - A flag indicating whether there is data to be filtered.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function GalleryFilter({onFilterChange, dataPresent}) {
    // State variables for operators and aircraft types
    const [operators, setOperators] = useState([]);
    const [aircraftTypes, setAircraftTypes] = useState([]);

    // Fetch operators and aircraft types on component mount
    useEffect(() => {
        const fetchOperators = axios.get('https://strapi-production-1911.up.railway.app/api/operators');
        const fetchAircraftTypes = axios.get('https://strapi-production-1911.up.railway.app/api/aircarft-types');

        Promise.all([fetchOperators, fetchAircraftTypes])
            .then(([operatorsResponse, aircraftTypesResponse]) => {
                // Sort and set the fetched data
                setOperators(operatorsResponse.data.data.sort((a, b) => a.attributes.label.localeCompare(b.attributes.label)));
                setAircraftTypes(aircraftTypesResponse.data.data.sort((a, b) => a.attributes.label.localeCompare(b.attributes.label)));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className={'filter'}>
            {/* Operator filter */}
            <div className={'filter_input operator'}>
                <label>Compagnie aérienne :</label>
                <select onChange={e => onFilterChange('operator', e.target.value)} disabled={!dataPresent}>
                    <option value="">Compagnie aérienne</option>
                    {operators.map(operator => (
                        <option key={operator.id} value={operator.id}>{operator.attributes.label}</option>
                    ))}
                </select>
            </div>
            {/* Aircraft type filter */}
            <div className={'filter_input aircraft-name'}>
                <label>Type d'avion :</label>
                <select onChange={e => onFilterChange('type', e.target.value)} disabled={!dataPresent}>
                    <option value="">Type d'avion</option>
                    {aircraftTypes.map(aircraftType => (
                        <option key={aircraftType.id} value={aircraftType.id}>{aircraftType.attributes.label}</option>
                    ))}
                </select>
            </div>
            {/* Registration filter */}
            <div className={'filter_input registration'}>
                <label>Immatriculation :</label>
                <input type={'text'} onChange={e => onFilterChange('registration', e.target.value)}
                       disabled={!dataPresent} placeholder={"Immatriculation"}/>
            </div>
        </div>
    );
}