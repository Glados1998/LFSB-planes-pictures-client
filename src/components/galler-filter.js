/**
 * GalleryFilter is a React component that provides a filter interface for a gallery.
 * It fetches data for operators and aircraft types from an API and provides select inputs for each.
 * The selected values are passed back to the parent component through the onFilterChange callback.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onFilterChange - The callback function to be called when a filter value changes.
 * @param {boolean} props.dataPresent - A flag indicating whether there is data present in the gallery.
 */
import {useEffect, useState} from "react";
import axios from 'axios';

export default function GalleryFilter({onFilterChange, dataPresent}) {
    // State variables for operators and aircraft types
    const [operators, setOperators] = useState([]);
    const [aircraftTypes, setAircraftTypes] = useState([]);

    // useEffect hook to fetch data from the API on component mount
    useEffect(() => {
        // API calls to fetch operators and aircraft types
        const fetchOperators = axios.get('https://strapi-production-1911.up.railway.app/api/operators');
        const fetchAircraftTypes = axios.get('https://strapi-production-1911.up.railway.app/api/aircarft-types');

        // Promise.all to wait for both API calls to complete
        Promise.all([fetchOperators, fetchAircraftTypes])
            .then(([operatorsResponse, aircraftTypesResponse]) => {
                // Set the state variables with the fetched data
                setOperators(operatorsResponse.data.data);
                setAircraftTypes(aircraftTypesResponse.data.data);
            })
            .catch(error => {
                // Log any errors that occur during the API calls
                console.error('Error fetching data:', error);
            });
    }, []);

    // Render the filter interface
    return (
        <div className={'filter'}>
            <div className={'filter_input operator'}>
                <label>Company aérienne:</label>
                {/* Select input for operators. Calls the onFilterChange callback when the value changes. */}
                <select onChange={e => onFilterChange('operator', e.target.value)} disabled={!dataPresent}>
                    <option value="">Company aérienne</option>
                    {/* Map over the operators and render an option for each */}
                    {operators.map(operator => (
                        <option key={operator.id} value={operator.id}>{operator.attributes.label}</option>
                    ))}
                </select>
            </div>
            <div className={'filter_input aircraft-name'}>
                <label>Type d'avion:</label>
                {/* Select input for aircraft types. Calls the onFilterChange callback when the value changes. */}
                <select onChange={e => onFilterChange('type', e.target.value)} disabled={!dataPresent}>
                    <option value="">Type d'avion</option>
                    {/* Map over the aircraft types and render an option for each */}
                    {aircraftTypes.map(aircraftName => (
                        <option key={aircraftName.id} value={aircraftName.id}>{aircraftName.attributes.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}