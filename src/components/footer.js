import Link from "next/link";
import {useTranslations} from "next-intl";

const navigation = [
    {label: 'home', path: '/'},
    {label: 'gallery', path: '/gallery/'},
    {label: 'dashboard', path: 'https://strapi-production-1911.up.railway.app/admin', external: true},
];

export default function Footer() {
    const t = useTranslations("footer");
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 text-gray-800 py-4">
            <div className="mx-auto px-8">
                <div className="grid md:grid-flow-col gap-8">
                    <div>
                        <h2 className="text-xl font-bold mb-4">LFSB Planes Pictures</h2>
                        <div className="space-y-2">
                            <p>&copy; {currentYear} | {t("info.copyright")}</p>
                            <p>
                                {t("info.artist")} {' '}
                                <a href="https://www.jerome-greder.com" target="_blank" rel="noopener noreferrer"
                                   className="text-blue-600 hover:underline">
                                    Jérôme Greder
                                </a>
                            </p>
                            <p>
                                {t("info.strapi")} {' '}
                                <a href="https://strapi.io" target="_blank" rel="noopener noreferrer"
                                   className="text-blue-600 hover:underline">
                                    Strapi CMS
                                </a>
                            </p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4">{t("navigation.navigation")}</h2>
                        <nav>
                            <ul className="space-y-2">
                                {navigation.map(item => (
                                    <li key={item.label}>
                                        {item.external ? (
                                            <a
                                                href={item.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-gray-600 transition-colors duration-300"
                                            >
                                                {t(`navigation.${item.label}`)}
                                            </a>
                                        ) : (
                                            <Link
                                                href={item.path}
                                                className="hover:text-gray-600 transition-colors duration-300"
                                            >
                                                {t(`navigation.${item.label}`)}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}
