import React from "react";
import Link from "next/link";

export default function Header() {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link href="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/gallery/">
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link href="/about">
                                About
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link href="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}
