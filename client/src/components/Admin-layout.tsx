import React from "react";
import SideBarNavigation from "@/components/sideBarNavigation";

type LayoutProps = {
    children: React.ReactNode;
}

export default function AdminLayout({children}: LayoutProps) {
    return (
        <div className="flex">
            <div className="w-64 h-screen bg-white text-white">
                <SideBarNavigation />
            </div>
            <div className="flex-1 p-10">
                {children}
            </div>
        </div>
    );
}
