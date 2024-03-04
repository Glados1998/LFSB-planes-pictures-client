import React, {useState} from 'react';
import Card from "@/components/card";
import Pagination from "@/components/pagination"; // Assuming you have a separated Pagination component
import {PiWarningFill} from "react-icons/pi";
import useFetchAircraft from "@/hooks/useFetchAircraft";
import CardSkeleton from "@/components/CardSkeleton";
import GalleryFilter from "@/components/gallerFilter";

export default function Gallery() {
    const [filters, setFilters] = useState({
        operator: '',
        type: '',
        registration: ''
    });
    const [pageIndex, setPageIndex] = useState(1);
    const {aircraft, pagination, sysMessage, isLoading} = useFetchAircraft(filters, pageIndex);

    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value
        }));
    };

    return (
        <div className={'gallery'}>
            <div className={'filter-component'}>
                <GalleryFilter onFilterChange={handleFilterChange} dataPresent={aircraft.length > 0}/>
            </div>

            {aircraft.length > 0 ? (
                <>
                    {isLoading ? (
                        <div className={'gallery_area'}>
                            {[...Array(12)].map((e, i) => <CardSkeleton key={i}/>)}
                        </div>
                    ) : (
                        <div className={'gallery_area'}>
                            {aircraft.map(plane => <Card key={plane.id} plane={plane}/>)}
                        </div>
                    )}

                    <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex} pagination={pagination}/>
                </>
            ) : sysMessage && (
                <div className={'gallery_message'}>
                    <div className="message-box">
                        <div className="icon"><PiWarningFill/></div>
                        <p>{sysMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
