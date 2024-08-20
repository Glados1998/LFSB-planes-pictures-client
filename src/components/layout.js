import Footer from './footer'
import Header from "@/components/header";
import {Analytics} from "@vercel/analytics/react"

export default function Layout({children}) {
    return (
        <div className="layout-container">
            <Header/>
            <main className="main-content">
                {children}
                <Analytics/>
            </main>
            <Footer/>
        </div>
    );
}
