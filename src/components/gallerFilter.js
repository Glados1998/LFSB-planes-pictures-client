import {useEffect, useState} from "react";
import axios from 'axios';
import {useTranslations} from "next-intl";

export async function getStaticProps(context) {
    return {
        props: {
            // You can get the messages from anywhere you like. The recommended
            // pattern is to put them in JSON files separated by locale and read
            // the desired one based on the `locale` received from Next.js.
            messages: (await import(`public/locales/${context.locale}.json`)).default
        }
    };
}


export default function GalleryFilter({onFilterChange, dataPresent}) {
    const t = useTranslations("filter");

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
                <label>{t("operator")} :</label>
                <select onChange={e => onFilterChange('operator', e.target.value)} disabled={!dataPresent}>
                    <option value="">{t("operator")}</option>
                    {operators.map(operator => (
                        <option key={operator.id} value={operator.id}>{operator.attributes.label}</option>
                    ))}
                </select>
            </div>
            <div className={'filter_input aircraft-name'}>
                <label>{t("type")} :</label>
                <select onChange={e => onFilterChange('type', e.target.value)} disabled={!dataPresent}>
                    <option value="">{t("type")}</option>
                    {aircraftTypes.map(aircraftType => (
                        <option key={aircraftType.id} value={aircraftType.id}>{aircraftType.attributes.label}</option>
                    ))}
                </select>
            </div>
            <div className={'filter_input registration'}>
                <label>{t("registration")} :</label>
                <input type={'text'} onChange={e => onFilterChange('registration', e.target.value)}
                       disabled={!dataPresent} placeholder={t("registration")}/>
            </div>
        </div>
    );
}
