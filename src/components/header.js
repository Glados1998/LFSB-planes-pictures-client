import React, {useState} from 'react';
import Link from 'next/link';
import {useTranslations} from "next-intl";
import LanguageSwitcher from "@/components/languageSwitcher";
import {Menu, X} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const t = useTranslations("header");

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navItems = [
        {href: '/', label: 'home'},
        {href: '/gallery', label: 'gallery'},
    ];

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="text-xl font-bold text-gray-800 hover:text-gray-600 mr-6">
                        LFSB Planes Pictures
                    </Link>
                    <nav className="hidden md:flex space-x-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-gray-800 hover:text-gray-600 font-medium transition duration-300"
                            >
                                {t(item.label)}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center">
                    <div className="hidden md:block mr-4">
                        <LanguageSwitcher/>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                    </Button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white px-4 py-2 shadow-md">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="block py-2 text-gray-800 hover:text-gray-600 font-medium transition duration-300"
                            onClick={toggleMenu}
                        >
                            {t(item.label)}
                        </Link>
                    ))}
                    <div className="py-2">
                        <LanguageSwitcher/>
                    </div>
                </nav>
            )}
        </header>
    );
}
