import React, {useState} from 'react';
import Link from 'next/link';
import {FaBars, FaTimes} from 'react-icons/fa';
import {useTranslations} from "next-intl";
import LanguageSwitcher from "@/components/languageSwitcher";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const t = useTranslations("header");

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navItems = [
        {href: '/', label: 'home'},
        {href: '/gallery', label: 'gallery'},
    ];

    return (
        <header className="bg-white">
            <div className="mx-auto px-8 py-4 flex items-center">
                <Link href="/" className="text-xl font-bold text-gray-800 hover:text-gray-600">
                    LFSB Planes Pictures
                </Link>

                <nav className="hidden md:flex space-x-4 md:ml-5">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-gray-800 hover:text-gray-600 font-bold transition duration-300"
                        >
                            {t(item.label)}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center space-x-4 md:ml-auto">
                    <LanguageSwitcher/>
                    <button
                        className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white px-8 py-2 shadow-md">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="block py-2 text-gray-800 transition duration-300 font-bold"
                            onClick={toggleMenu}
                        >
                            {t(item.label)}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
}
