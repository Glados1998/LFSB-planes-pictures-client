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
                        lorem ipsum
                    </p>
                </div>
            </div>
        </div>
    )
}
