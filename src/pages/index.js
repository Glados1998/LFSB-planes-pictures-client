import Image from "next/image";
import papaHeadshot from "src/assets/images/papa-profile2.JPG";

export default function Home() {
    return (
        <div className={'home'}>
            <div className="home_headline">
                <div className="home_headline-text">
                    <h2>
                        Discover the Skies Through My Lens
                    </h2>
                    <h1>
                        LFSB Planes Pictures
                    </h1>
                    <hr/>
                    <p>
                        Step into a world where the roar of jet engines and the elegance of aircraft design come alive.
                        Welcome to my private photo gallery, capturing the dynamic spirit of aviation at <span>EuroAirport Basel-Mulhouse-Freiburg</span> –
                        a crossroads of cultures and aeronautical innovation.
                    </p>
                </div>

            </div>
            <div className={'home_about'}>
                <div className={'image'}>
                    <Image src={papaHeadshot} alt={'Laurent Greder'} width={650} height={500} objectFit={'cover'}/>
                </div>
                <div className={'text'}>
                    <h1>About the Photographer</h1>
                    <p>
                        Greetings! I am Laurent Greder, an avid aviation enthusiast and dedicated spotter. My journey
                        with aircraft photography began several years ago, fueled by a deep fascination for these
                        engineering marvels and the stories they carry across the skies.
                    </p>
                    <p>
                        While my primary canvas is the bustling <span>EuroAirport Basel-Mulhouse-Freiburg</span>, I
                        occasionally find myself capturing the unique aviation scenes
                        at <span>Geneva Airport (LSGG)</span> and <span>Zurich Airport (LSZH)</span>. Each location
                        offers a distinct glimpse into the world of aviation, from busy international hubs to serene,
                        sky-bound departures.
                    </p>
                </div>
            </div>
        </div>
    )
}
