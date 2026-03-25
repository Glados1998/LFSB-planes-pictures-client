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
                    alt={props.title || 'N/A'}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"/>
            </div>
            <div className="absolute inset-0 flex flex-col p-16 text-white">
                <div>
                    <h3 className="text-5xl">
                        {props.title || 'N/A'}
                    </h3>
                    <p className="mt-1">
                        {props.subtitle || 'N/A'}
                    </p>
                    {props.url ? (
                        <>
                            <p className="py-4 text-xl font-light">
                                {t.rich("cta", {
                                    br: () => <br/>
                                })}
                            </p>
                            <Link
                                href={`/${props.url}`}
                                className="px-4 py-2 bg-white text-black text-base font-semibold rounded hover:bg-gray-200 hover:cursor-pointer transition-colors duration-300"
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
