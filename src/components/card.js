import Link from "next/link";
import notFound from "@/assets/images/imageNotFound.jpg";
import {useTranslations} from "next-intl";
import {buttonVariants} from "@/components/ui/button";

export default function Card({plane}) {
    const t = useTranslations("card");
    const {attributes} = plane;
    const {image, type, operator, registration} = attributes;

    const imageUrl = image?.data?.attributes?.url || notFound;
    const aircraftRegistration = registration || 'N/A';
    const operatorLabel = operator?.data?.attributes?.label || 'N/A';

    return (
        <Link href={`/gallery/${plane.id}`} className="relative group overflow-hidden shadow">
            <div className="relative w-full h-64 md:size-full">
                <img
                    src={imageUrl}
                    fill
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    alt={aircraftRegistration}
                    className="w-full h-full md:size-max object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-10"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                <h3 className="text-base sm:text-lg font-semibold">{aircraftRegistration}</h3>
                <p className="text-sm">{operatorLabel}</p>
                <span
                    className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                        className: "mt-2 w-fit text-xs group-hover:border-slate-400 group-hover:bg-slate-50 group-hover:text-slate-900 sm:h-9 sm:px-4 sm:text-sm"
                    })}>
                    {t("general.show")}
                </span>
            </div>
        </Link>
    )
}
