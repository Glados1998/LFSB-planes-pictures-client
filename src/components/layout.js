import Footer from './footer'
import Header from "@/components/header";

export default function Layout({ children }) {

    return (
        <>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    )
}
