import Link from "next/link";
import Image from "next/image";
import {notFound} from "@/assets/images/imageNotFound.jpg";

export default function Card({plane}) {
    const {attributes} = plane;
    const {image, type, operator} = attributes;

    const imageUrl = image?.data?.attributes?.formats?.large?.url || notFound;
    const aircraftType = type?.data?.attributes?.label || 'N/A';
    const operatorLabel = operator?.data?.attributes?.label || 'N/A';

    return (
        <Link href={`/gallery/${plane.id}`} className={'card card__shadow'}>
            <div className="card__image">
                <Image src={imageUrl} alt={aircraftType} width={300} height={200} priority/>
            </div>
            <div className="card__content">
                <div className="card__content-title">
                    <h3>{aircraftType}</h3>
                    <p>{operatorLabel}</p>
                </div>
            </div>
            <div className="card__footer">
                <button className="button">
                    Voir plus
                </button>
            </div>
        </Link>
    )
}