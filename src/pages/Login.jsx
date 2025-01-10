import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { LoginStyles } from './LoginStyles';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/content');
        }
    }, [navigate]);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            if (response.data.success) {
                localStorage.setItem('user', JSON.stringify({ email }));
                alert('Login successful!');
                navigate('/content');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLoginSuccess = async (response) => {
        try {
            const { credential } = response;
            const serverResponse = await axios.post('http://localhost:5000/google-login', { token: credential });

            if (serverResponse.data.success) {
                console.log('Google login successful.');
                console.log('User:', serverResponse.data.user);
                localStorage.setItem('user', JSON.stringify(serverResponse.data.user));
                navigate('/content');
            } else {
                console.error('Login failed:', serverResponse.data.message);
            }
        } catch (err) {
            console.error('An error occurred with Google login. Please try again.', err);
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.error('Google login failed. Please try again.', error);
    };

    return (
        <>
            <Header />
            <LoginStyles>
                <div className='main-div-login'>
                    <h1>Login</h1>
                    <form onSubmit={handleLoginSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" disabled={loading}>
                            Login
                        </button>
                    </form>
                    {error && <p>{error}</p>}
                    <GoogleOAuthProvider clientId="60153437629-j0ig1ntfbslgr7je2d5617fuqv10kh74.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onFailure={handleGoogleLoginFailure}
                        />
                    </GoogleOAuthProvider>
                    <Link to="/register">Registre-se</Link>
                </div>
            </LoginStyles>
        </>
    );
};

export default Login;