import React, {useState} from 'react';
import Link from 'next/link';
import {FaAngleDown, FaAngleUp} from 'react-icons/fa';
import LanguageSwitcher from "@/components/languageSwitcher";

export default function Header() {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className={'header'}>
            <nav className={'header_nav'}>
                <div className={'header_nav_logo'}>
                    <h1>
                        LFSB Planes Pictures
                    </h1>
                </div>
                <div className="header_nav_toogle">
                    {showMenu ? <FaAngleUp onClick={() => setShowMenu(!showMenu)}/> :
                        <FaAngleDown onClick={() => setShowMenu(!showMenu)}/>}
                </div>
                <ul className={'header_nav_bar'}>
                    <li className={'header_nav_bar_link'}>
                        <Link href='/'>Acceuil</Link>
                    </li>
                    <li className={'header_nav_bar_link'}>
                        <Link href='/gallery'>Galerie</Link>
                    </li>
                </ul>
                {showMenu && <div className={'header_nav_menu'}>
                    <ul className={'header_nav_menu'}>
                        <li className={'header_nav_menu_link'}>
                            <Link href='/' onClick={() => setShowMenu(!showMenu)}>Acceuil</Link>
                        </li>
                        <li className={'header_nav_menu_link'}>
                            <Link href='/gallery' onClick={() => setShowMenu(!showMenu)}>Galerie</Link>
                        </li>
                    </ul>
                </div>}
                <div className={'header_nav_language'}>
                    <LanguageSwitcher/>
                </div>
            </nav>
        </header>
    );
}
