import Image from "next/image";
import papaHeadshot from "src/assets/images/papa-profile.JPEG";

export default function Home() {
    return (
        <div className={'home'}>
            <div className="home_headline">
                <h2>
                    Welcome to
                </h2>
                <h1>
                    LFSB Planes pictures
                </h1>
                <hr/>
                <p>
                    A private photo gallery of aircraft taken at <span>EuroAirport Basel-Mulhouse-Freiburg.</span>
                </p>
            </div>
            <div className={'home_about'}>
                <div className={'image'}>
                    <Image src={papaHeadshot} alt={'Papa'} width={300} height={500} objectFit={'cover'}/>
                </div>
                <div className={'text'}>
                    <h1>About me</h1>
                    <p>
                        Hellos my name is Laurent Greder I am a passionate <span>spotter.</span> <br/>
                        I have been taking pictures of aircraft for several years now here at <span>EuroAirport Basel-Mulhouse-Freiburg.</span>
                    </p>
                    <p>
                        Occasionally I also take pictures of aircraft at <span>Geneva Airport (LSGG)</span> and <span>Zurich Airport (LSZH).</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
