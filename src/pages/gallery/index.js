import axios from 'axios';
import {useEffect, useState} from 'react';
import GalleryFilter from "@/components/galler-filter";
import Link from "next/link";
import Card from "@/components/card";

export default function Gallery() {

    const [aircraft, setAircraft] = useState([])

    useEffect(() => {
        axios.get('https://strapi-production-1911.up.railway.app/api/aircrafts?populate=*').then(res => {
            setAircraft(res.data.data)
        }).catch(err => {
            console.error(err)
        })
    }, [])

    return (
        <div className={'gallery'}>
            <div className={'filter'}>
                <GalleryFilter/>
            </div>
            <div className={'gallery_area'}>
                {
                    aircraft.map((item, index) => {
                        return (
                            <Card plane={item} key={index}/>
                        )
                    })
                }
            </div>
            <div className={'gallery_footer pagination'}>

            </div>
        </div>
    );
}
