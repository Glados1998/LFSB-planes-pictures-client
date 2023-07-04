import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
