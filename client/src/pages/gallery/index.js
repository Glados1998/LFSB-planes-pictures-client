import axios from 'axios';
import {useEffect , useState} from 'react';
import GalleryFilter from "@/components/galler-filter";
import Link from "next/link";
import Card from "@/components/card";

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
            <div>
                <h1>Gallery</h1>
            </div>
            <div>
                <GalleryFilter
                    onFilterChange={(field , value) => {
                        setFilters ( prev => ({ ...prev , [field] : value }) );
                        setCurrentPage ( 1 );
                    }}
                />
            </div>
            <div className={'grid grid-cols-4 gap-5'}>
                {aircrafts.map ( aircraft => (
                    <Card key={aircraft._id} plane={aircraft}/>
                ))}
            </div>
            <div className={'mt-4 grid gap-6 grid-flow-col auto-cols-min place-content-center'}>
                <button className={'rounded-full bg-blue-500 text-white font-medium text-md p-1 m-2 hover:shadow-md hover:bg-blue-600'} onClick={() => setCurrentPage ( prev => Math.max ( 1 , prev - 1 ) )}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                </button>
                <span className={'text-xl align-text-bottom'}>{currentPage}</span>
                <button className={'rounded-full bg-blue-500 text-white font-medium text-md p-1 m-2 hover:shadow-md hover:bg-blue-600'} onClick={() => setCurrentPage ( prev => prev + 1 )}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
