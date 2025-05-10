import Image from "next/image";
import papaHeadshot from "@/assets/images/papa-profile2.jpg";
import IntroImage from "@/assets/images/jan-kopriva-o-R0Qurz28g-unsplash.jpg";
import {useTranslations} from 'next-intl';
import {useVisitorCounter} from "@/hooks/visitorCounter";

export async function getStaticProps(context) {
    return {
        props: {
            // You can get the messages from anywhere you like. The recommended
            // pattern is to put them in JSON files separated by locale and read
            // the desired one based on the `locale` received from Next.js.
            messages: (await import(`public/locales/${context.locale}.json`)).default
        }
    };
}

export default function Home() {

    const {visits, loading, error} = useVisitorCounter();

    const t = useTranslations("home");
    return (
        <div className="container max-w-8xl">
            <div className="flex flex-col gap-52">
                <header className={"flex flex-col md:flex-row gap-8 text-left justify-center"}>
                    <div>
                        <span className={"text-2xl font-bold"}>
                        {t("headline")}
                        </span>
                        <hr className={"py-3 border-t-2 w-56"}/>
                        <h1 className={"text-5xl font-bold"}>
                            LFSB Planes Pictures
                        </h1>
                        <p className={"text-xl w-[400px] py-3"}>
                            {t.rich('subheadline', {
                                span: (chunks) => <span className={"font-semibold"}>{chunks}</span>,
                            })}
                        </p>
                    </div>
                    <div className="relative w-full">
                        <Image src={IntroImage} alt={"header image"} fill={true} objectFit={"cover"}
                               className={"rounded-lg"} loading={"eager"}/>
                    </div>
                </header>
                <main className={"flex flex-col md:flex-row gap-8 text-left justify-center"}>
                    <div className="relative w-[800px] h-[500px]">
                        <Image src={papaHeadshot} alt={"header image"} fill={true} objectFit={"cover"}
                               className={"rounded-lg"} loading={"eager"}/>
                    </div>
                    <div>
                        <h1 className={"text-5xl font-bold"}>
                            {t("about.headline")}
                        </h1>
                        <p className={"text-xl w-[600px] py-3"}>
                            {t("about.text1")}
                        </p>
                        <p className={"text-xl w-[600px] py-3"}>
                            {t.rich('about.text2', {
                                span: (chunks) => <span className={"font-semibold"}>{chunks}</span>,
                            })}
                        </p>
                    </div>
                </main>
                <footer></footer>
            </div>
        </div>
    )
}
