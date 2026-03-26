import React, {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useTranslations} from "next-intl";
import LanguageSwitcher from "@/components/languageSwitcher";
import {Menu, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useVisitorCounter} from "@/hooks/visitorCounter";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const t = useTranslations("header");
    const {visits, loading, error} = useVisitorCounter();
    const router = useRouter();
    const {locales = [], locale: currentLocale, pathname, query} = router;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLocaleChange = (locale) => {
        if (locale === currentLocale) {
            return;
        }

        router.push({pathname, query}, pathname, {locale});
        setIsMenuOpen(false);
    };

    const navItems = [
        {href: '/', label: 'home'},
        {href: '/gallery', label: 'gallery'},
        {href: '/about', label: 'about'},
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
                    <div className="hidden md:flex items-center gap-4 mr-4">
                        <div className="flex items-center">
                            <span className={"mr-2 text-gray-800 font-medium"}>
                                {t('language')} :
                            </span>
                            <LanguageSwitcher/>
                        </div>
                        <div className="text-sm text-gray-600">
                            {loading ? (
                                <span>{t("visits.loading")}</span>
                            ) : error ? null : (
                                t.rich('visits.text', {
                                    count: visits,
                                    span: (chunks) => <span className="font-semibold">{chunks}</span>,
                                })
                            )}
                        </div>
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
                    <div className="py-2 ">
                        <span className={"mr-2 text-gray-800 font-medium"}>
                            {t('language')} :
                        </span>
                        <div className="mt-2 flex gap-2">
                            {locales.map((locale) => {
                                const isActiveLocale = locale === currentLocale;

                                return (
                                    <button
                                        key={locale}
                                        type="button"
                                        className={`rounded border px-2 py-1 text-sm font-medium transition ${
                                            isActiveLocale
                                                ? 'border-gray-800 bg-gray-800 text-white'
                                                : 'border-gray-300 text-gray-800 hover:border-gray-600'
                                        }`}
                                        onClick={() => handleLocaleChange(locale)}
                                        disabled={isActiveLocale}
                                        aria-current={isActiveLocale ? 'true' : undefined}
                                    >
                                        {locale.toUpperCase()}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="py-2 text-sm text-gray-600 border-t border-gray-100">
                        {loading ? (
                            <span>{t("visits.loading")}</span>
                        ) : error ? null : (
                            t.rich('visits.text', {
                                count: visits,
                                span: (chunks) => <span className="font-semibold">{chunks}</span>,
                            })
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
}
