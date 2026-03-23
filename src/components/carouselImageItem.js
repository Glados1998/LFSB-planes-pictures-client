import notFound from "@/assets/images/imageNotFound.jpg";
import Link from "next/link";
import {useTranslations} from "next-intl";

export async function getStaticProps(context) {
    return {
        props: {
            messages: (await import(`messages/${context.locale}.json`)).default
        }
    };
}


export default function CarouselImageItem({aircraft}) {

    const {attributes} = aircraft;
    const {image, operator, registration} = attributes;

    const t = useTranslations("card");
    const imageUrl = image?.data?.attributes?.url || notFound;
    const operatorLabel = operator?.data?.attributes?.label || 'N/A';
    const registrationLabel = registration || 'N/A';

    return (
        <div className={"relative aspect-video w-full overflow-hidden"}>
            <div className={"relative w-full h-64 md:size-full"}>
                <img
                    src={imageUrl}
                    className="w-full h-full"
                    alt={registrationLabel}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"/>
            </div>
            <div className="absolute inset-0 flex flex-col p-16 text-white">
                <div>
                    <h3 className="text-5xl font-semibold mb-1">
                        <span className={"font-light font-serif italic"}>
                            {t("meetThe")} {" "}</span>
                        {registrationLabel}
                    </h3>
                    <p className="text-3xl font-bold">
                    <span className={"font-light font-serif italic"}>
                        {t("by")} {" "}
                    </span>
                        {operatorLabel}
                    </p>
                    <p className={"py-4 text-xl font-light"}>
                        {t.rich("cta", {
                            br: () => <br/>
                        })}
                    </p>
                    <Link href={`/gallery/${aircraft.id}`}
                          className="px-4 py-2 bg-white text-black text-base font-semibold rounded hover:bg-gray-200 hover:cursor-pointer transition-colors duration-300">
                        {t("general.show")}
                    </Link>
                </div>
            </div>
        </div>
    )
}
