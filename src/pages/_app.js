// These styles apply to every route in the application
import '@/styles/main.scss'
import Layout from '../components/layout'

export default function App({ Component , pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
