import Link from "next/link";
import {useTranslations} from "next-intl";

const navigation = [
    {label: 'home', path: '/', target: '_self'},
    {label: 'gallery', path: '/gallery/', target: '_self'},
    {label: 'dashboard', path: 'https://strapi-production-1911.up.railway.app/admin', target: '_self'},
]

export default function Footer() {

    const t = useTranslations("footer");


    return (
        <footer className='footer'>
            <div className='footer__cols'>
                <div className='footer__cols-item'>
                    <h3>LFSB Planes Pictures</h3>
                    <div className='footer__info'>
                        <p>&copy; {new Date().getFullYear()} | {t("info.copyright")}</p>
                        <p>{t("info.artist")} <a href='https://www.jerome-greder.com' target='_blank'>Jérôme Greder</a>
                        </p>
                        <p>{t("info.strapi")} <a href='https://strapi.io' target='_blank'>Strapi CMS</a></p>
                    </div>
                </div>
                <div className='footer__cols-item'>
                    <h3>Navigation</h3>
                    <ul className='footer__nav'>
                        {navigation.map(item => (
                            <li key={item.label} className='footer__nav-link'>
                                <Link href={item.path} target={item.target}>{t(`navigation.${item.label}`)}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    )
}