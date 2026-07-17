import {useEffect, useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import {Input} from "@/components/ui/input";
import {Combobox} from "@/components/Combobox";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {apiClient, isRequestCanceled} from "@/lib/apiClient";

const ITEMS_PER_PAGE = 20;
// Keep this legacy spelling until the Strapi content type is migrated.
const AIRCRAFT_TYPE_ENDPOINT = "aircarft-types";

function useFilterOptions(endpoint, query) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const timeout = window.setTimeout(async () => {
            try {
                const response = await apiClient.get(`/${endpoint}`, {
                    signal: controller.signal,
                    params: {
                        'filters[label][$containsi]': query,
                        'pagination[pageSize]': ITEMS_PER_PAGE,
                        sort: 'label:asc'
                    }
                });

                setOptions(response.data.data.map(item => ({
                    value: item.id,
                    label: item.attributes.label,
                })));
            } catch (error) {
                if (!isRequestCanceled(error)) {
                    console.error(`Error fetching ${endpoint}:`, error);
                    setOptions([]);
                }
            }
        }, 150);

        return () => {
            window.clearTimeout(timeout);
            controller.abort();
        };
    }, [endpoint, query]);

    return options;
}

/**
 * GalleryFilter component for filtering gallery items by operator, aircraft type, and registration.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.filters - Current gallery filter values.
 * @param {function} props.onFilterChange - Callback function to handle filter changes.
 * @param {function} props.onResetFilters - Callback used to clear all filters.
 * @returns {JSX.Element}
 */
export default function GalleryFilter({filters, onFilterChange, onResetFilters}) {
    const t = useTranslations("filter");

    const [operatorQuery, setOperatorQuery] = useState('');
    const [aircraftTypeQuery, setAircraftTypeQuery] = useState('');
    const operators = useFilterOptions('operators', operatorQuery);
    const aircraftTypes = useFilterOptions(AIRCRAFT_TYPE_ENDPOINT, aircraftTypeQuery);

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
        setOperatorQuery(query);
    };

    /**
     * Handles search input for aircraft types.
     *
     * @param {string} query - Search query.
     */
    const handleAircraftTypeSearch = (query) => {
        setAircraftTypeQuery(query);
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
                    searchPlaceholder={t("search", {item: t("operator").toLowerCase()})}
                    emptyMessage={t("notFound", {item: t("operator").toLowerCase()})}
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
                    searchPlaceholder={t("search", {item: t("type").toLowerCase()})}
                    emptyMessage={t("notFound", {item: t("type").toLowerCase()})}
                />
            </div>
            <div className="space-y-2">
                <Label className="text-sm font-semibold sm:text-md sm:font-bold">{t("registration")}:</Label>
                <Input
                    className={"bg-white hover:bg-gray-100"}
                    type="text"
                    value={filters.registration}
                    onChange={(e) => onFilterChange('registration', e.target.value)}
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
