import {useCallback, useEffect, useMemo, useState} from "react";
import axios from 'axios';
import {useTranslations} from "next-intl";
import {Input} from "@/components/ui/input";
import {Combobox} from "@/components/Combobox";
import {Label} from "@/components/ui/label";
import debounce from 'lodash/debounce';
import {Button} from "@/components/ui/button";

const ITEMS_PER_PAGE = 20;

/**
 * GalleryFilter component for filtering gallery items by operator, aircraft type, and registration.
 *
 * @component
 * @param {Object} props
 * @param {function} props.onFilterChange - Callback function to handle filter changes.
 * @param {boolean} props.dataPresent - Indicates if data is present to enable/disable registration input.
 * @returns {JSX.Element}
 */
export default function GalleryFilter({filters, onFilterChange, onResetFilters, dataPresent}) {
    const t = useTranslations("filter");

    const [operators, setOperators] = useState([]);
    const [aircraftTypes, setAircraftTypes] = useState([]);

    /**
     * Fetches options from the API for the given endpoint and query.
     *
     * @param {string} endpoint - The API endpoint to fetch from.
     * @param {string} [query=''] - The search query for filtering options.
     * @returns {Promise<Array<{value: string, label: string}>>}
     */
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

    /**
     * Debounced a version of fetchOptions to limit API calls during search.
     */
    const debouncedFetchOptions = useCallback(
        debounce((endpoint, query, callback) => {
            fetchOptions(endpoint, query).then(callback);
        }, 300),
        [fetchOptions]
    );

    // Fetch initial options for operators and aircraft types on mount.
    useEffect(() => {
        fetchOptions('operators').then(setOperators);
        fetchOptions('aircarft-types').then(setAircraftTypes);
    }, [fetchOptions]);

    /**
     * Handles operator selection change.
     *
     * @param {string} value - Selected operator value.
     */
    const handleOperatorChange = (value) => {
        onFilterChange('operator', value);
    };

    /**
     * Handles aircraft type selection change.
     *
     * @param {string} value - Selected aircraft type value.
     */
    const handleAircraftTypeChange = (value) => {
        onFilterChange('type', value);
    };

    /**
     * Handles search input for operators.
     *
     * @param {string} query - Search query.
     */
    const handleOperatorSearch = (query) => {
        debouncedFetchOptions('operators', query, setOperators);
    };

    /**
     * Handles search input for aircraft types.
     *
     * @param {string} query - Search query.
     */
    const handleAircraftTypeSearch = (query) => {
        debouncedFetchOptions('aircarft-types', query, setAircraftTypes);
    };

    const hasActiveFilters = useMemo(
        () => Object.values(filters).some(value => typeof value === 'string' ? value.trim() !== '' : Boolean(value)),
        [filters]
    );

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
                <Label className="text-sm font-semibold sm:text-md sm:font-bold">{t("operator")}:</Label>
                <Combobox
                    options={operators}
                    value={filters.operator}
                    onChange={handleOperatorChange}
                    onSearch={handleOperatorSearch}
                    placeholder={t("operator")}
                />
            </div>
            <div className="space-y-2">
                <Label className="text-sm font-semibold sm:text-md sm:font-bold">{t("type")}:</Label>
                <Combobox
                    options={aircraftTypes}
                    value={filters.type}
                    onChange={handleAircraftTypeChange}
                    onSearch={handleAircraftTypeSearch}
                    placeholder={t("type")}
                />
            </div>
            <div className="space-y-2">
                <Label className="text-sm font-semibold sm:text-md sm:font-bold">{t("registration")}:</Label>
                <Input
                    className={"bg-white hover:bg-gray-100"}
                    type="text"
                    value={filters.registration}
                    onChange={(e) => onFilterChange('registration', e.target.value)}
                    disabled={!dataPresent}
                    placeholder={t("registration")}
                />
            </div>
            <div className="space-y-2">
                <Label className="text-sm font-semibold sm:text-md sm:font-bold">{t("reset")}:</Label>
                <Button
                    className={"hover:bg-red-500 hover:border-red-500 hover:text-white"}
                    type="button"
                    variant="outline"
                    onClick={onResetFilters}
                    disabled={!hasActiveFilters}
                >
                    {t("reset")}
                </Button>
            </div>
        </div>
    );
}
