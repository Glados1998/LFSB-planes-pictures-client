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


export default function CarouselImageSlide({aircraft}) {

    const {attributes} = aircraft;
    const {image, operator, registration} = attributes;

    const t = useTranslations("card");
    const imageUrl = image?.data?.attributes?.url || notFound;
    const operatorLabel = operator?.data?.attributes?.label || 'N/A';
    const registrationLabel = registration || 'N/A';

    return (
        <div className={"relative aspect-video w-full overflow-hidden"}>
            <div className={"relative h-64 w-full md:size-full"}>
                <img
                    src={imageUrl}
                    className="h-full w-full object-cover"
                    alt={registrationLabel}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"/>
            </div>
            <div className="absolute inset-0 flex p-4 text-white sm:p-6 md:p-10 lg:p-16">
                <div className="max-w-full space-y-2 sm:max-w-3xl sm:space-y-4">
                    <header className="space-y-1">
                        <h3 className="mb-1 text-xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
                            <span className="font-serif font-light italic">{t("meetThe")} </span>
                            {registrationLabel}
                        </h3>
                        <p className="text-sm font-bold leading-snug sm:text-xl md:text-2xl lg:text-3xl">
                            <span className="font-serif font-light italic">{t("by")} </span>
                            {operatorLabel}
                        </p>
                    </header>

                    <p className="py-1 text-xs font-semibold sm:font-light sm:py-2 sm:text-base md:text-xl">
                        {t.rich("cta", {
                            br: () => <br/>
                        })}
                    </p>

                    <Link
                        href={`/gallery/${aircraft.id}`}
                        className="inline-block rounded bg-white px-2 py-1 text-xs font-semibold text-black transition-colors duration-300 hover:cursor-pointer hover:bg-gray-200 sm:px-4 sm:py-2 sm:text-base"
                    >
                        {t("general.show")}
                    </Link>
                </div>
            </div>
        </div>
    )
}
