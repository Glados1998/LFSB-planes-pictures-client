import {useTranslations} from "next-intl";
import notFound from "@/assets/images/imageNotFound.jpg";
import Link from "next/link";
import Image from "next/image";

export default function CarouselSlide({...props}) {

    const t = useTranslations("card");

    return (
        <div className={"relative aspect-video w-full overflow-hidden"}>
            <div className={"relative h-64 w-full md:size-full"}>
                <Image
                    src={props.image || notFound}
                    className="h-full w-full object-cover"
                    alt={props.imageAlt || 'Carousel slide'}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"/>
            </div>
            <div className="absolute inset-0 flex p-4 text-white sm:p-6 md:p-10 lg:p-16">
                <div className="max-w-full space-y-2 sm:max-w-3xl sm:space-y-4">
                    <header className="space-y-1">
                        <h3 className="mb-1 text-xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
                            {props.title || 'N/A'}
                        </h3>
                        <p className="text-sm font-medium md:font-light leading-snug sm:text-xl md:text-2xl lg:text-3xl">
                            {props.subtitle || 'N/A'}
                        </p>
                    </header>

                    {props.url ? (
                        <>
                            <p className="py-1 text-xs font-medium sm:font-light sm:py-2 sm:text-base md:text-xl">
                                {t.rich("cta2", {
                                    br: () => <br/>
                                })}
                            </p>
                            <Link
                                href={`/${props.url}`}
                                className="inline-block rounded bg-white px-2 py-1 text-xs font-semibold text-black transition-colors duration-300 hover:cursor-pointer hover:bg-gray-200 sm:px-4 sm:py-2 sm:text-base"
                            >
                                {t("general.show")}
                            </Link>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
