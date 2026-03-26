import {useTranslations} from "next-intl";
import AboutImage from "@/assets/images/aboutThumbnail.jpg";
import Image from "next/image";

export async function getStaticProps(context) {
    return {
        props: {
            messages: (await import(`messages/${context.locale}.json`)).default
        }
    };
}

export default function About() {

    const t = useTranslations("about");

    return (
        <div className="container mx-auto px-4 py-8">
            <div className={"grid grid-flow-row"}>
                <div className={"flex flex-col md:flex-row justify-around "}>
                    <div>
                        <h1 className={"text-4xl mb-4"}>
                            {t.rich("intro.title", {
                                i: (chunks) => <span className="font-serif italic font-light">{chunks}</span>,
                                strong: (chunks) => <span className="font-bold">{chunks}</span>
                            })}
                        </h1>
                        <p>
                            {t("intro.text")}
                        </p>
                    </div>
                    <div>
                        <Image src={AboutImage} alt="" className={"w-auto h-90 shadow"}/>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}
