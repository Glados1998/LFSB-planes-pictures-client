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
            <div className="absolute inset-0 flex p-16 text-white">
                <div className="max-w-3xl space-y-4">
                    <header className="space-y-1">
                        <h3 className="mb-1 text-5xl font-semibold">
                            <span className="font-serif font-light italic">{t("meetThe")} </span>
                            {registrationLabel}
                        </h3>
                        <p className="text-3xl font-bold">
                            <span className="font-serif font-light italic">{t("by")} </span>
                            {operatorLabel}
                        </p>
                    </header>

                    <p className="py-2 text-xl font-light">
                        {t.rich("cta", {
                            br: () => <br/>
                        })}
                    </p>

                    <Link
                        href={`/gallery/${aircraft.id}`}
                        className="inline-block rounded bg-white px-4 py-2 text-base font-semibold text-black transition-colors duration-300 hover:cursor-pointer hover:bg-gray-200"
                    >
                        {t("general.show")}
                    </Link>
                </div>
            </div>
        </div>
    )
}
