import Link from "next/link";
import {useTranslations} from "next-intl";
import {SiNextdotjs, SiStrapi, SiVercel} from "react-icons/si";

const navigation = [
    {label: 'home', path: '/'},
    {label: 'gallery', path: '/gallery/'},
    {label: 'about', path: '/about/'},
    {label: 'dashboard', path: 'https://strapi-production-1911.up.railway.app/admin', external: true},
];

export default function Footer() {
    const t = useTranslations("footer");
    const currentYear = new Date().getFullYear();
    const externalLinkClass = "inline-flex items-center gap-1.5 align-middle text-blue-600 hover:underline";
    const iconClass = "h-4 w-4 shrink-0";

    return (
        <footer className="bg-white py-3 text-gray-800 md:py-4">
            <div className="container mx-auto px-4">
                <div className="grid gap-5 text-sm md:grid-cols-2 md:gap-6">
                    <section aria-labelledby="footer-site-title" className="space-y-1.5 leading-6">
                        <h2 id="footer-site-title" className="text-base font-semibold leading-tight">LFSB Planes
                            Pictures</h2>
                        <p>
                            <small>&copy; {currentYear} | {t("info.copyright")}</small>
                        </p>
                        <p>
                            {t("info.artist")} {" "}
                            <a
                                href="https://www.jerome-greder.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Jerome Greder
                            </a>
                        </p>
                        <p>
                            {t("info.usedTechnologies")} {" "}
                            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer"
                               className={externalLinkClass}>
                                <SiNextdotjs className={iconClass} aria-hidden="true"/>
                                <span>Next.js</span>
                            </a>{" "}
                            {t("info.hostedOn")} {" "}
                            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer"
                               className={externalLinkClass}>
                                <SiVercel className={iconClass} aria-hidden="true"/>
                                <span>Vercel</span>
                            </a>
                        </p>
                        <p>
                            {t("info.strapi")} {" "}
                            <a href="https://strapi.io" target="_blank" rel="noopener noreferrer"
                               className={externalLinkClass}>
                                <SiStrapi className={iconClass} aria-hidden="true"/>
                                <span>Strapi CMS</span>
                            </a>
                        </p>
                    </section>

                    <section aria-labelledby="footer-nav-title">
                        <h2 id="footer-nav-title" className="mb-1.5 text-base font-semibold leading-tight">
                            {t("navigation.navigation")}
                        </h2>
                        <nav aria-label={t("navigation.navigation")}>
                            <ul className="space-y-1.5">
                                {navigation.map(item => (
                                    <li key={item.label}>
                                        {item.external ? (
                                            <a
                                                href={item.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="transition-colors duration-300 hover:text-gray-600"
                                            >
                                                {t(`navigation.${item.label}`)}
                                            </a>
                                        ) : (
                                            <Link
                                                href={item.path}
                                                className="transition-colors duration-300 hover:text-gray-600"
                                            >
                                                {t(`navigation.${item.label}`)}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </section>
                </div>
            </div>
        </footer>
    );
}
