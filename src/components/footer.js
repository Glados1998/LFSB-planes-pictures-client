import Link from "next/link";

const navigation = [
    {label: 'Home', path: '/', target: '_self'},
    {label: 'Gallery', path: '/gallery/', target: '_self'},
    {label: 'Admin', path: 'https://strapi-production-1911.up.railway.app/admin', target: '_self'},
]

export default function Footer() {
    return (
        <footer className='footer'>
            <div className='footer__cols'>
                <div className='footer__cols-item'>
                    <h3>LFSB Planes Pictures</h3>
                    <div className='footer__info'>
                        <p>&copy; {new Date().getFullYear()} | All rights reserved</p>
                        <p>Made by <a href='https://www.jerome-greder.com' target='_blank'>Jérôme Greder</a></p>
                        <p>Content managed with <a href='https://strapi.io' target='_blank'>Strapi</a></p>
                    </div>
                </div>
                <div className='footer__cols-item'>
                    <h3>Navigation</h3>
                    <ul className='footer__nav'>
                        {navigation.map(item => (
                            <li key={item.label} className='footer__nav-link'>
                                <Link href={item.path} target={item.target}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    )
}