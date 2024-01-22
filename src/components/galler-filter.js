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
import SearchSelectInput from "@/components/SearchSelectInput";

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

    function handleTypeSelect(selectedType) {
        const selectedId = selectedType.id;
        onFilterChange('type', selectedId);
    }

    function handleOperatorSelect(selectedOperator) {
        const selectedId = selectedOperator.id;
        onFilterChange('operator', selectedId);
    }


    // Render the filter interface
    return (
        <div className={'filter'}>
            <div className={'filter_input operator'}>
                <label>Company aérienne:</label>
                {/* Select input for operators. Calls the onFilterChange callback when the value changes. */}
                <SearchSelectInput options={operators} onSelect={handleOperatorSelect}/>
            </div>
            <div className={'filter_input aircraft-name'}>
                <label>Type d'avion:</label>
                {/* Select input for aircraft types. Calls the onFilterChange callback when the value changes. */}
                <SearchSelectInput options={aircraftTypes} onSelect={handleTypeSelect}/>
            </div>
        </div>
    );
}