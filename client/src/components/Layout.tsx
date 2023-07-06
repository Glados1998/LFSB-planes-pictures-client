import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LayoutProps = {
    children: React.ReactNode;
}

export default function Layout({children}: LayoutProps) {
    return (
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
}
