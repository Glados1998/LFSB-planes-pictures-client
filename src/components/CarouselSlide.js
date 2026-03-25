import {useTranslations} from "next-intl";
import notFound from "@/assets/images/imageNotFound.jpg";
import Link from "next/link";
import Image from "next/image";

export default function CarouselSlide({...props}) {

    const t = useTranslations("card");

    return (
        <div className={"relative aspect-video w-full overflow-hidden"}>
            <div className={"relative w-full h-64 md:size-full"}>
                <Image
                    src={props.image || notFound}
                    className="w-full h-full"
                    alt={props.imageAlt || 'Carousel slide'}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"/>
            </div>
            <div className="absolute inset-0 flex p-16 text-white">
                <div className="max-w-3xl space-y-4">
                    <header className="space-y-1">
                        <h3 className="mb-1 text-5xl font-semibold">
                            <span className="group relative inline-block cursor-default pb-1">
                                {props.title || 'N/A'}
                                <span
                                    className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"/>
                            </span>
                        </h3>
                        <p className="text-3xl font-bold">
                            <span className="group relative inline-block cursor-default pb-1">
                                {props.subtitle || 'N/A'}
                                <span
                                    className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"/>
                            </span>
                        </p>
                    </header>

                    {props.url ? (
                        <>
                            <p className="py-2 text-xl font-light">
                                {t.rich("cta", {
                                    br: () => <br/>
                                })}
                            </p>
                            <Link
                                href={`/${props.url}`}
                                className="inline-block rounded bg-white px-4 py-2 text-base font-semibold text-black transition-colors duration-300 hover:cursor-pointer hover:bg-gray-200"
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
