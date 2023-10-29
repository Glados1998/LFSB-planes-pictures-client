import axios from 'axios';
import {useEffect , useState} from 'react';
import GalleryFilter from "@/components/galler-filter";
import Link from "next/link";

export default function Gallery() {
    const [ aircrafts , setAircrafts ] = useState ( [] );
    const [ currentPage , setCurrentPage ] = useState ( 1 );
    const [ filters , setFilters ] = useState ( {
        operator : null ,
        registry : null ,
        serialNumber : null,
        aircraftName : null,
        aircraftType : null,
    } );

    useEffect ( () => {
        let queryParams = new URLSearchParams ();
        queryParams.append ( 'page' , currentPage );

        if ( filters.operator ) queryParams.append ( 'operator' , filters.operator );
        if ( filters.registry ) queryParams.append ( 'registry' , filters.registry );
        if ( filters.serialNumber ) queryParams.append ( 'serialNumber' , filters.serialNumber );
        if ( filters.aircraftName ) queryParams.append ( 'aircraftName' , filters.aircraftName );
        if ( filters.aircraftType ) queryParams.append ( 'aircraftType' , filters.aircraftType );

        axios.get ( `http://localhost:8000/api/aircraft?${queryParams.toString ()}` )
            .then ( response => {
                setAircrafts ( response.data );
                console.log ( response.data)
            } )
            .catch ( error => {
                console.error ( 'Error fetching aircrafts for gallery:' , error );
            } );
    } , [ filters , currentPage ] );

    return (
        <div>
            <h1>Gallery</h1>
            <div>
                <GalleryFilter
                    onFilterChange={(field , value) => {
                        setFilters ( prev => ({ ...prev , [field] : value }) );
                        setCurrentPage ( 1 );
                    }}
                />
            </div>
            <div style={{
                display : 'grid' , gridTemplateColumns : 'repeat(auto-fill, minmax(200px, 1fr))' , gap : '16px'
            }}>
                {aircrafts.map ( aircraft => (
                    <div key={aircraft._id}>
                        <Link href={`/gallery/${aircraft._id}`}>
                            <img src={aircraft.image} alt={`Aircraft ${aircraft.aircraft_identification.registry}`}
                                 style={{ width : '100%' }}/>
                        </Link>
                    </div>
                ) )}
            </div>
            <div>
                <button onClick={() => setCurrentPage ( prev => Math.max ( 1 , prev - 1 ) )}>Previous</button>
                <span>Page: {currentPage}</span>
                <button onClick={() => setCurrentPage ( prev => prev + 1 )}>Next</button>
            </div>
        </div>
    );
}
