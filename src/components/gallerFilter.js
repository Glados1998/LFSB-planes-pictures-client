import {useCallback, useEffect, useState} from "react";
import axios from 'axios';
import {useTranslations} from "next-intl";
import {Input} from "@/components/ui/input";
import {Combobox} from "@/components/Combobox";
import {Label} from "@/components/ui/label";
import debounce from 'lodash/debounce';

const ITEMS_PER_PAGE = 10; // Set the default amount to show

export default function GalleryFilter({onFilterChange, dataPresent}) {
    const t = useTranslations("filter");

    const [operators, setOperators] = useState([]);
    const [aircraftTypes, setAircraftTypes] = useState([]);
    const [selectedOperator, setSelectedOperator] = useState("");
    const [selectedAircraftType, setSelectedAircraftType] = useState("");

    const fetchOptions = useCallback(async (endpoint, query = '') => {
        try {
            const response = await axios.get(`https://strapi-production-1911.up.railway.app/api/${endpoint}`, {
                params: {
                    'filters[label][$containsi]': query,
                    'pagination[pageSize]': ITEMS_PER_PAGE,
                    sort: 'label:asc'
                }
            });
            return response.data.data.map(item => ({value: item.id, label: item.attributes.label}));
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            return [];
        }
    }, []);

    const debouncedFetchOptions = useCallback(
        debounce((endpoint, query, callback) => {
            fetchOptions(endpoint, query).then(callback);
        }, 300),
        [fetchOptions]
    );

    useEffect(() => {
        fetchOptions('operators').then(setOperators);
        fetchOptions('aircarft-types').then(setAircraftTypes);
    }, [fetchOptions]);

    const handleOperatorChange = (value) => {
        setSelectedOperator(value);
        onFilterChange('operator', value);
    };

    const handleAircraftTypeChange = (value) => {
        setSelectedAircraftType(value);
        onFilterChange('type', value);
    };

    const handleOperatorSearch = (query) => {
        debouncedFetchOptions('operators', query, setOperators);
    };

    const handleAircraftTypeSearch = (query) => {
        debouncedFetchOptions('aircarft-types', query, setAircraftTypes);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
                <Label className="text-sm font-medium">{t("operator")}:</Label>
                <Combobox
                    options={operators}
                    value={selectedOperator}
                    onChange={handleOperatorChange}
                    onSearch={handleOperatorSearch}
                    placeholder={t("operator")}
                />
            </div>
            <div className="space-y-2">
                <Label className="text-sm font-medium">{t("type")}:</Label>
                <Combobox
                    options={aircraftTypes}
                    value={selectedAircraftType}
                    onChange={handleAircraftTypeChange}
                    onSearch={handleAircraftTypeSearch}
                    placeholder={t("type")}
                />
            </div>
            <div className="space-y-2">
                <Label className="text-sm font-medium">{t("registration")}:</Label>
                <Input
                    type="text"
                    onChange={(e) => onFilterChange('registration', e.target.value)}
                    disabled={!dataPresent}
                    placeholder={t("registration")}
                />
            </div>
        </div>
    );
}
