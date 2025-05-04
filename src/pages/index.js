import Image from "next/image";
import papaHeadshot from "@/assets/images/papa-profile2.jpg";
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
    console.log(visits, loading, error);

    const t = useTranslations("home");
    return (
        <div className={'home'}>
            <div className="home_headline">
                <div className="home_headline-text">
                    <h2>
                        {t('headline')}
                    </h2>
                    <h1 className={'title'}>
                        LFSB Planes Pictures
                    </h1>
                    <hr/>
                    <p>
                        {t.rich('subheadline', {
                            span: (chunks) => <span>{chunks}</span>,
                        })}
                    </p>
                </div>

            </div>
            <div className={'home_about'}>
                <div className={'image'}>
                    <Image src={papaHeadshot} alt={'Laurent Greder'} width={650} height={500} objectFit={'cover'}/>
                </div>
                <div className={'text'}>
                    <h1>{t('about.headline')}</h1>
                    <p>
                        {t("about.text1")}
                    </p>
                    <p>
                        {t.rich('about.text2', {
                            span: (chunks) => <span>{chunks}</span>,
                        })}
                    </p>
                </div>
                <div>
                    {visits}
                </div>
            </div>
        </div>
    )
}
