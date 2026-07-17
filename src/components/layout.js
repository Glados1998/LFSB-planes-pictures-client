import Footer from './footer'
import Header from "@/components/header";
import {Analytics} from "@vercel/analytics/react"

export default function Layout({children}) {
    return (
        <div className="bg-white flex min-h-screen flex-col">
            <Header/>
            <div className="flex-grow">
                {children}
                <Analytics/>
            </div>
            <Footer/>
        </div>
    );
}
