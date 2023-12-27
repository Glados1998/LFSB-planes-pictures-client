import Link from "next/link";
import Image from "next/image";
import formatDate from "@/utils/timestamp-format";
import {notFound} from "@/assets/images/imageNotFound.jpg";


export default function Card({plane}) {

    const {attributes} = plane;

    const imageUrl = attributes.image?.data?.attributes?.formats?.large?.url;
    const aircraftType = attributes.type?.data?.attributes?.label;
    const operator = attributes.operator?.data?.attributes?.label;
    const publishedAt = formatDate(attributes?.publishedAt);

    return (
        <Link href={`/gallery/${plane.id}`} className={'card card__shadow'}>
            <div className="card__image">
                <Image src={imageUrl || notFound} alt={aircraftType} width={300} height={200}/>
            </div>
            <div className="card__content">
                <div className="card__content-title">
                    <h3>{aircraftType || 'N/A'}</h3>
                    <p>{operator || 'N/A'}</p>
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
