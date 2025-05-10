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
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-24 py-12">
                <header className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/2">
                <span className="text-2xl font-bold text-gray-600">
                    {t("headline")}
                </span>
                        <hr className="my-4 border-t-2 w-56 border-gray-300"/>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                            LFSB Planes Pictures
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-lg">
                            {t.rich('subheadline', {
                                span: (chunks) => <span className="font-semibold">{chunks}</span>,
                            })}
                        </p>
                    </div>
                    <div className="lg:w-1/2 relative aspect-video w-full max-w-2xl">
                        <Image
                            src={IntroImage}
                            alt="header image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg shadow-lg"
                            priority
                        />
                    </div>
                </header>

                <main className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/2 relative aspect-4/3 w-full max-w-2xl">
                        <Image
                            src={papaHeadshot}
                            alt="Laurent Greder"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg shadow-lg"
                            priority
                        />
                    </div>
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                            {t("about.headline")}
                        </h2>
                        <div className="space-y-4 text-gray-600">
                            <p className="text-lg">
                                {t("about.text1")}
                            </p>
                            <p className="text-lg">
                                {t.rich('about.text2', {
                                    span: (chunks) => <span className="font-semibold">{chunks}</span>,
                                })}
                            </p>
                        </div>
                    </div>
                </main>
                <footer></footer>
            </div>
        </div>
    )
}
