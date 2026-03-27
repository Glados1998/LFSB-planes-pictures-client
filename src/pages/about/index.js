import {useTranslations} from "next-intl";
import AboutImage from "@/assets/images/aboutThumbnail.jpg";
import FatherImage from "@/assets/images/papaProfile.jpg";
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
        <div className="container mx-auto px-4 py-10 md:py-14">
            <div className={"grid grid-flow-row gap-20"}>
                <div className={"flex flex-col md:flex-row items-start justify-around"}>
                    <div className="max-w-2xl text-left">
                        <h1 className={"mb-4 text-left text-4xl leading-tight"}>
                            {t.rich("intro.title", {
                                br: () => <br/>,
                                i: (chunks) => <span className="font-serif italic font-light">{chunks}</span>,
                                strong: (chunks) => <span className="font-bold">{chunks}</span>
                            })}
                        </h1>
                        <div className={"flex flex-col gap-4 text-left leading-relaxed"}>
                            <p className="text-left leading-relaxed">
                                {t.rich("intro.text", {
                                    br: () => <br/>,
                                    strong: (chunks) => <span className="font-bold">{chunks}</span>,
                                    i: (chunks) => <span className="font-serif italic font-light">{chunks}</span>,
                                })}
                            </p>
                            <p className="text-left leading-relaxed">
                                {t.rich("intro.text2", {
                                    br: () => <br/>,
                                    strong: (chunks) => <span className="font-bold">{chunks}</span>,
                                    i: (chunks) => <span className="font-serif italic font-light">{chunks}</span>,
                                })}
                            </p>
                        </div>
                    </div>
                    <div>
                        <Image src={AboutImage} alt="About section image" className={"h-90 w-auto shadow"}/>
                    </div>
                </div>
                <div className={"flex flex-col md:flex-row items-start justify-around"}>
                    <div>
                        <Image src={FatherImage} alt="Photographer portrait" className={"h-90 w-auto shadow"}/>
                    </div>
                    <div className="max-w-2xl text-left">
                        <h1 className={"mb-4 text-left text-4xl leading-tight"}>
                            {t.rich("about.title", {
                                i: (chunks) => <span className="font-serif italic font-light">{chunks}</span>,
                                strong: (chunks) => <span className="font-bold">{chunks}</span>
                            })}
                        </h1>
                        <div className={"flex flex-col gap-4 text-left leading-relaxed"}>
                            <p>
                                {t.rich("about.text", {
                                    br: () => <br/>
                                })}
                            </p>
                            <p>
                                {t.rich("about.text2", {
                                    br: () => <br/>,
                                    span: (chunks) => <span className="font-bold">{chunks}</span>
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
