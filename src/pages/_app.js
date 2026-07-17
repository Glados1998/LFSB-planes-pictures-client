import '@/assets/styles/global.css'
import Layout from '../components/layout'
import {NextIntlClientProvider} from "next-intl";
import {useRouter} from 'next/router';
import {useIncrementVisitor} from "@/hooks/useIncrementVisitor";
import Head from "next/head";
import defaultMessages from "../../messages/fr.json";

const defaultDescription = "A private aviation photography gallery featuring aircraft spotted around EuroAirport Basel-Mulhouse-Freiburg.";

export default function App({Component, pageProps}) {
    const router = useRouter();
    useIncrementVisitor();

    return (
        <>
            <Head>
                <title>LFSB Planes Pictures</title>
                <meta name="description" content={defaultDescription}/>
                <meta
                    name="keywords"
                    content="aviation, aircraft photography, plane spotting, EuroAirport, Basel, Mulhouse, Freiburg, LFSB, LSGG, LSZH"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <NextIntlClientProvider
                locale={router.locale || router.defaultLocale || "fr"}
                timeZone="Europe/Zurich"
                messages={pageProps.messages || defaultMessages}
            >
                <Layout>
                    <Component key={router.asPath} {...pageProps} />
                </Layout>
            </NextIntlClientProvider>
        </>
    )
}
