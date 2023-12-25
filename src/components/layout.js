import Footer from './footer'
import Header from "@/components/header";

export default function Layout({children}) {
    return (
        <div className="layout-container">
            <Header/>
            <main className="main-content">
                {children}
            </main>
            <Footer/>
        </div>
    );
}
