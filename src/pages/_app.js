import '@/assets/styles/global.css'
import Layout from '../components/layout'
import {NextIntlClientProvider} from "next-intl";
import {useRouter} from 'next/router';
import {useIncrementVisitor} from "@/hooks/useIncrementVisitor";

export default function App({Component, pageProps}) {
    const router = useRouter();
    useIncrementVisitor();
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
