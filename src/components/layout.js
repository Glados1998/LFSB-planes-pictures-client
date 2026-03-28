import Footer from './footer'
import Header from "@/components/header";
import {Analytics} from "@vercel/analytics/react"

export default function Layout({children}) {
    return (
        <div className="bg-white flex min-h-screen flex-col">
            <Header/>
            <main className="flex-grow">
                {children}
                <Analytics/>
            </main>
            <Footer/>
        </div>
    );
}
