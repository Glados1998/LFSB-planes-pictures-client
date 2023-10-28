import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/user/login', { email, password });
            console.log ( response)
            if (response.data && response.data.user) {
                // Store the token and redirect to admin dashboard (as an example)
                localStorage.setItem('token', response.data.user);
                await router.push ( '/admin' );
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong.');
            console.error ( err)
        }
    };

    return (
        <div>
            <div>
                <h1>Admin login</h1>
            </div>
            <div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">
                            <span>Email</span>
                            <input type="email" name="email" id="email" value={email} onChange={handleInputChange} />
                        </label>
                        <label htmlFor="password">
                            <span>Password</span>
                            <input type="password" name="password" id="password" value={password} onChange={handleInputChange} />
                        </label>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <Link href="/forgot-password">Forgot password?</Link>
            </div>
        </div>
    )
}
