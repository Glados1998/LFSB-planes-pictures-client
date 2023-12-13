import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import axios from "axios";
import {useRouter} from "next/router";
import LanguageSwitcher from "@/components/language-switcher";

export default function Header() {

    return (
        <header className={'header'}>
            <nav className={'header_nav'}>
                <div className={'header_nav_logo'}>
                    <h1>
                        LFSB Planes Pictures
                    </h1>
                </div>
                <ul className={'header_nav_bar'}>
                    <li className={'header_nav_bar_link'}>
                        <Link href='/'>Acceuil</Link>
                    </li>
                    <li className={'header_nav_bar_link'}>
                        <Link href='/gallery'>Galerie</Link>
                    </li>
                </ul>
                {/*<div className={'header_nav_language'}>
                    <LanguageSwitcher/>
                </div>*/}
            </nav>
        </header>
    );
}
