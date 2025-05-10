import Footer from './footer'
import Header from "@/components/header";
import {Analytics} from "@vercel/analytics/react"

export default function Layout({children}) {
    return (
        <div className={"m-0"}>
            <Header/>
            <main className={"py-10 flex justify-around"}>
                {children}
                <Analytics/>
            </main>
            <Footer/>
        </div>
    );
}
