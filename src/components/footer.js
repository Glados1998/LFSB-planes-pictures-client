import Link from "next/link";

const navigation = [
    {label: 'Home', path: '/'},
    {label: 'Gallery', path: '/gallery/'},
    {label: 'Admin', path: '/login'}
]

export default function Footer() {
    return (
        <footer className='footer'>
            <div className='footer__cols'>
                <div className='footer__cols-item'>
                    <h3>LFSB Planes Pictures</h3>
                    <div className='footer__info'>
                        <span>&copy; {new Date().getFullYear()} | All rights reserved</span>
                        <span>Made by <a href='https://www.jerome-greder.com' target='_blank'>Jérôme Greder</a></span>
                        <span>Content managed with <a href='https://strapi.io' target='_blank'>Strapi</a></span>
                    </div>
                </div>
                <div className='footer__cols-item'>
                    <h3>Navigation</h3>
                    <ul className='footer__nav'>
                        {navigation.map(item => (
                            <li key={item.label} className='footer__nav-link'>
                                <Link href={item.path}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    )
}