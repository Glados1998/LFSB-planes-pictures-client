import {useEffect, useRef, useState} from "react";
import {useTranslations} from 'next-intl';
import Autoplay from "embla-carousel-autoplay";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import CarouselImageSlide from "@/components/CarouselImageSlide";
import axios from "axios";
import CarouselSlide from "@/components/CarouselSlide";
import IntroImage from "@/assets/images/introThumbnail.jpg";
import AboutThumbnail from "@/assets/images/aboutThumbnail.jpg";
import {SESSION_STORAGE_KEYS} from "@/lib/sessionStorageKeys";
import {getSessionJson, setSessionJson} from "@/lib/sessionStore";

export async function getStaticProps(context) {
    return {
        props: {
            // You can get the messages from anywhere you like. The recommended
            // pattern is to put them in JSON files separated by locale and read
            // the desired one based on the `locale` received from Next.js.
            messages: (await import(`messages/${context.locale}.json`)).default
        }
    };
}

export default function Home() {
    const t = useTranslations("home");
    const autoplay = useRef(Autoplay({delay: 8000, stopOnInteraction: false}));
    const [aircrafts, setAircrafts] = useState([]);

    const introHeadline = t.rich("intro.headline", {
        br: () => <br/>,
        i: (chunks) => <span className="font-serif italic font-light">{chunks}</span>,
        strong: (chunks) => <span className="font-semibold sm:font-bold">{chunks}</span>
    });
    const introText = t.rich("intro.text", {
        span: (chunks) => <span className="text-sm font-light sm:text-lg md:text-2xl">{chunks}</span>
    });
    const aboutHeadline = t.rich("about.headline", {
        i: (chunks) => <span className="font-serif italic font-light">{chunks}</span>,
        strong: (chunks) => <span className="font-semibold sm:font-bold">{chunks}</span>
    })
    const aboutText = t.rich("about.text")

    const WelcomeHeadline = t.rich("welcome.headline", {
        br: () => <br/>,
        i: (chunks) => <span className="font-serif italic font-light">{chunks}</span>,
        strong: (chunks) => <span className="font-semibold sm:font-bold">{chunks}</span>
    });

    useEffect(() => {
        // Reuse cached data within the same browser session (survives refreshes).
        // A new session (new tab / browser reopen) clears sessionStorage and
        // triggers a fresh fetch with a new random page.
        const cached = getSessionJson(SESSION_STORAGE_KEYS.CAROUSEL_AIRCRAFTS, []);
        if (cached.length > 0) {
            setAircrafts(cached);
            return;
        }

        const randomPage = Math.floor(Math.random() * 10) + 1;
        axios.get(`${process.env.STRAPI_API_URL}/aircrafts?pagination[page]=${randomPage}&pagination[pageSize]=3&populate=*`)
            .then(response => {
                const data = response.data.data;
                setSessionJson(SESSION_STORAGE_KEYS.CAROUSEL_AIRCRAFTS, data);
                setAircrafts(data);
            })
            .catch(error => {
                console.error("Error fetching aircraft data:", error);
            });
    }, []);

    return (
        <div>
            <div className="grid grid-flow-row gap-8 sm:gap-12 md:gap-11">
                <header className="space-y-4 sm:space-y-8">
                    {/* Wide hero carousel */}
                    <Carousel
                        opts={{loop: true}}
                        plugins={[autoplay.current]}
                        className="w-full"
                    >
                        <CarouselContent>
                            <CarouselItem>
                                <CarouselSlide image={IntroImage} title={introHeadline} subtitle={introText}/>
                            </CarouselItem>
                            {aircrafts.map((aircraft) => (
                                <CarouselItem key={aircraft.id}>
                                    <CarouselImageSlide aircraft={aircraft}/>
                                </CarouselItem>
                            ))}
                            <CarouselItem>
                                <CarouselSlide image={AboutThumbnail} title={aboutHeadline} subtitle={aboutText}
                                               url={"/about"}/>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious
                            className="invisible left-2 h-5 w-5 sm:visible sm:left-5 sm:h-10 sm:w-10 border-none"/>
                        <CarouselNext
                            className="invisible right-2 h-5 w-5 sm:visible sm:right-5 sm:h-10 sm:w-10 border-none"/>
                    </Carousel>
                </header>
                <main className={"flex flex-col items-center justify-center  px-12 "}>
                    <h2 className={"text-xl sm:text-2xl md:text-3xl text-center"}>
                        {WelcomeHeadline}
                    </h2>
                    <p className={"text-center mt-2 mb-8 text-xs sm:text-base"}>
                        {t.rich("welcome.text", {
                            br: () => <br/>,
                        })}
                    </p>
                </main>
            </div>
        </div>
    )
}
