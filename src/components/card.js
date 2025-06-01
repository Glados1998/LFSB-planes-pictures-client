import Link from "next/link";
import notFound from "@/assets/images/imageNotFound.jpg";
import {useTranslations} from "next-intl";

export async function getStaticProps(context) {
    return {
        props: {
            messages: (await import(`public/locales/${context.locale}.json`)).default
        }
    };
}

export default function Card({plane}) {
    const t = useTranslations("gallery");
    const {attributes} = plane;
    const {image, type, operator} = attributes;

    const imageUrl = image?.data?.attributes?.url || notFound;
    const aircraftType = type?.data?.attributes?.label || 'N/A';
    const operatorLabel = operator?.data?.attributes?.label || 'N/A';

    return (
        <Link href={`/gallery/${plane.id}`} className="relative group overflow-hidden shadow-lg rounded-lg">
            <div className="relative w-full h-64 md:size-full">
                <img
                    src={imageUrl}
                    alt={aircraftType}
                    className="w-full h-full md:size-max object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-10"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-semibold">{aircraftType}</h3>
                <p className="text-sm">{operatorLabel}</p>
                <button
                    className="mt-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded hover:bg-gray-200 hover:cursor-pointer transition-colors duration-300">
                    {t("card.show")}
                </button>
            </div>
        </Link>
    )
}
