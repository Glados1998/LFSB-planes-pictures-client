import {useEffect, useRef, useState} from "react";
import {useTranslations} from 'next-intl';
import Autoplay from "embla-carousel-autoplay";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import CarouselImageSlide from "@/components/CarouselImageSlide";
import axios from "axios";
import CarouselSlide from "@/components/CarouselSlide";
import IntroImage from "@/assets/images/introThumbnail.jpg";
import AboutThumbnail from "@/assets/images/aboutThumbnail.jpg";

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

    useEffect(() => {
        axios.get(`${process.env.STRAPI_API_URL}/aircrafts?pagination[page]=1&pagination[pageSize]=3&populate=*`)
            .then(response => {
                setAircrafts(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching aircraft data:", error);
            });
    }, []);

    return (
        <div>
            <div className="grid grid-flow-row gap-8 sm:gap-12 md:gap-24">
                <header className="space-y-4 sm:space-y-8">
                    {/* Wide hero carousel */}
                    <Carousel
                        opts={{loop: true}}
                        // plugins={[autoplay.current]}
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
            </div>
        </div>
    )
}
