import React , {useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import Link from "next/link";

export default function Login() {
    const [ email , setEmail ] = useState ( '' );
    const [ password , setPassword ] = useState ( '' );
    const [ error , setError ] = useState ( null );
    const router = useRouter ();

    const handleInputChange = (e) => {
        const { name , value } = e.target;
        if ( name === 'email' ) setEmail ( value );
        if ( name === 'password' ) setPassword ( value );
    };

    const handleSubmit = async (e) => {
        e.preventDefault ();
        try {
            const response = await axios.post ( 'http://localhost:8000/api/user/login' , { email , password } );
            console.log ( response )
            if ( response.data && response.data.user ) {
                // Store the token and redirect to admin dashboard (as an example)
                localStorage.setItem ( 'token' , response.data.user.id ); // It seems you are storing user id, not a jwt token
                await router.push ( '/admin' );
            }

        } catch (err) {
            setError ( err.response?.data?.message || 'Something went wrong.' );
            console.error ( err )
        }
    };

    return (
        <div className={'grid grid-flow-row'}>
            <div>
                <h1 className={'text-4xl font-bold mb-3'}>Admin login</h1>
            </div>
            <div>
                {error && <p className={'font-medium text-red-500'}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className={'grid grid-flow-row gap-2'}>
                        <div>
                            <label htmlFor="email">
                                <span className={'font-bold text-xl'}>Email</span>
                            </label>
                        </div>
                        <div>
                            <input className={'rounded-md bg-gray-200 p-1'} type="email" name="email" id="email"
                                   value={email} onChange={handleInputChange}/>
                        </div>
                        <div>
                            <label htmlFor="password">
                                <span className={'font-bold text-xl'}>Password</span>
                            </label>
                        </div>
                        <div>
                            <input className={'rounded-md bg-gray-200 p-1'} type="password" name="password" id="password" value={password}
                                   onChange={handleInputChange}/>
                        </div>
                        <div className={''}>
                            <button className={'rounded-md bg-green-500 text-white font-medium text-md p-1 m-2 hover:shadow-md hover:bg-green-600'} type="submit">Login</button>
                            <Link className={'underline underline-offset-2'} href="/forgot-password">Forgot password</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
