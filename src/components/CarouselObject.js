import {useTranslations} from "next-intl";
import notFound from "@/assets/images/imageNotFound.jpg";
import Link from "next/link";

export default function CarouselObject({children}) {

    const t = useTranslations("card");
    const imageUrl = notFound;

    return (
        <div className={"relative aspect-video w-full overflow-hidden"}>
            <div className={"relative w-full h-64 md:size-full"}>
                <img
                    src={imageUrl}
                    className="w-full h-full"
                    alt={"..."}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"/>
            </div>
            <div className="absolute inset-0 flex flex-col p-16 text-white">
                <div>
                    <h3 className="text-5xl font-semibold mb-1">
                        <span className={"font-light font-serif italic"}>
                            {t("meetThe")} {" "}</span>
                    </h3>
                    <p className="text-3xl font-bold">
                    <span className={"font-light font-serif italic"}>
                        {t("by")} {" "}
                    </span>
                    </p>
                    <p className={"py-4 text-xl font-light"}>
                        {t.rich("cta", {
                            br: () => <br/>
                        })}
                    </p>
                    <Link href={`/`}
                          className="px-4 py-2 bg-white text-black text-base font-semibold rounded hover:bg-gray-200 hover:cursor-pointer transition-colors duration-300">
                        {t("general.show")}
                    </Link>
                </div>
            </div>
        </div>
    )
}
