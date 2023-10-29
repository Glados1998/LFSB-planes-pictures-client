import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from "axios";
import {useRouter} from "next/router";

export default function Header() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    };

    useEffect(() => {
        // Check auth on component mount
        checkAuth();

        // Listen for route changes
        const handleRouteChange = () => {
            checkAuth();
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        // Cleanup
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);




    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/user/logout');
            if (response.status === 200) {
                localStorage.removeItem('token');  // remove the token
                setIsAuthenticated(false);  // set user as unauthenticated
                await router.push('/');
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <header className={'bg-blue-400 text-white p-4'}>
            <nav className={'grid grid-flow-col auto-cols-max gap-5'}>
                <div>
                    <h1 className={'text-xl font-bold'}>
                        <Link href="/">
                            LFSB Planes Pictures
                        </Link>
                    </h1>
                </div>
                <ul className={'grid grid-flow-col auto-cols-max gap-8'}>
                    <li className={'font-medium hover:text-slate-300'}>
                        <Link href='/'>
                            Home
                        </Link>
                    </li>
                    <li className={'font-medium hover:text-slate-300'}>
                        <Link href='/gallery'>
                            Gallery
                        </Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li className={'font-medium hover:text-slate-300'}>
                                <Link href='/admin'>
                                    Admin
                                </Link>
                            </li>
                            <li onClick={handleLogout} className={'font-medium hover:text-slate-300 cursor-pointer'}>
                                Logout
                            </li>
                        </>
                    ) : (
                        <li className={'font-medium hover:text-slate-300'}>
                            <Link href='/login'>
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
