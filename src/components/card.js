import Link from "next/link";
import Image from "next/image";
import notFound from "@/assets/images/imageNotFound.jpg";

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

export default function Card({plane}) {
    const {attributes} = plane;
    const {image, type, operator} = attributes;


    const imageUrl = image?.data?.attributes?.url || notFound;
    const aircraftType = type?.data?.attributes?.label || 'N/A';
    const operatorLabel = operator?.data?.attributes?.label || 'N/A';
    const aircraftRegistration = attributes?.registration || 'N/A';

    return (
        <Link href={`/gallery/${plane.id}`} className={'card card__shadow'}>
            <div className="card__image">
                <Image src={imageUrl} alt={aircraftType} width={300} height={200} priority/>
            </div>
            <div className="card__content">
                <div className="card__content-title">
                    <h3>{aircraftType}</h3>
                </div>
                <div className="card__content-subtitle">
                    <p>{operatorLabel}</p>
                    <p>{aircraftRegistration}</p>
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