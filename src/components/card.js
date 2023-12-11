import Link from "next/link";
import Image from "next/image";
import formatDate from "@/utils/timestamp-format";


export default function Card({plane}) {

    return (
        <Link href={`/gallery/${plane.id}`} className={'card card__shadow'}>
            <div className="card__image">
                <Image src={plane.attributes.image.data.attributes.url} alt={plane.attributes.type.data.attributes.label} width={300} height={200}/>
            </div>
            <div className="card__content">
                <div className="card__title">
                    <h3>{plane.attributes.type.data.attributes.label}</h3>
                </div>
                <div className="card__description">
                    <p>{plane.attributes.operator.data.attributes.label}</p>
                    <p>Published: {formatDate(plane.attributes.publishedAt)}</p>
                </div>
            </div>
            <div className="card__footer">
                <div className="button">
                    See details
                </div>
            </div>
        </Link>
    )
}
