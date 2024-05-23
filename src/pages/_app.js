import '@/assets/styles/main.scss'
import Layout from '../components/layout'
import {NextIntlClientProvider} from "next-intl";
import {useRouter} from 'next/router';

export default function App({Component, pageProps}) {
    const router = useRouter();
    return (
        <NextIntlClientProvider
            locale={router.locale}
            timeZone={"Europe/London"}
            messages={pageProps.messages}
        >
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </NextIntlClientProvider>
    )
}