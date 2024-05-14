import Image from "next/image";
import papaHeadshot from "src/assets/images/papa-profile2.JPG";
import {useTranslations} from 'next-intl';

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

    const t = useTranslations();
    return (
        <div className={'home'}>
            <div className="home_headline">
                <div className="home_headline-text">
                    <h2>
                        {t('home.headline')}
                    </h2>
                    <h1 className={'title'}>
                        LFSB Planes Pictures
                    </h1>
                    <hr/>
                    <p>
                        Entrez dans un monde où le rugissement des moteurs à réaction et l'élégance du design des avions
                        prennent vie. Bienvenue dans ma galerie photo privée, capturant l'esprit dynamique de l'aviation
                        à <span>l'EuroAirport Bâle-Mulhouse-Fribourg</span> –
                        un carrefour des cultures et de l'innovation aéronautique.
                    </p>
                </div>

            </div>
            <div className={'home_about'}>
                <div className={'image'}>
                    <Image src={papaHeadshot} alt={'Laurent Greder'} width={650} height={500} objectFit={'cover'}/>
                </div>
                <div className={'text'}>
                    <h1>À propos du photographe</h1>
                    <p>
                        Salutations ! Je suis Laurent Greder, un passionné d'aviation et spotter dévoué. Mon parcours
                        dans la photographie aéronautique a commencé il y a plusieurs années, alimenté par une
                        fascination profonde pour ces merveilles d'ingénierie et les histoires qu'elles portent à
                        travers les cieux.
                    </p>
                    <p>
                        Bien que mon principal terrain de jeu soit l'effervescent <span>EuroAirport Bâle-Mulhouse-Fribourg</span>,
                        il m'arrive occasionnellement de capturer des scènes d'aviation uniques à
                        <span>l'aéroport de Genève (LSGG)</span> and <span>l'aéroport de Zurich (LSZH)</span>.
                        Chaque lieu offre un aperçu distinct du monde de l'aviation, des hubs internationaux animés aux
                        départs sereins vers le ciel.
                    </p>
                </div>
            </div>
        </div>
    )
}
