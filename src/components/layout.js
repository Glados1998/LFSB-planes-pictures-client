import Footer from './footer'
import Header from "@/components/header";
import {Analytics} from "@vercel/analytics/react"

export default function Layout({children}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-grow py-10">
                {children}
                <Analytics/>
            </main>
            <Footer/>
        </div>
    );
}
