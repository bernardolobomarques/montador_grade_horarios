import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginStyles } from './LoginStyles';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                setLoading(false);
                return;
            }
            const response = await axios.post('http://localhost:5000/register', { email, password, name });
            console.log(response.data); // Adicionado para depuração
            if (response.data === 'User registered!') {
                alert('Registro feito com sucesso! Você será redirecionado para a página de login.');
                navigate('/login');
            } else {
                setError('Registration failed');
            }
        } catch (err) {
            console.error(err); // Adicionado para depuração
            setError('Registration failed');
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
            <LoginStyles>
                <div className='home-button'>
                    <Link to='/'>VOLTAR</Link>
                </div>
                <div className='main-div-login'>
                    <h1>Register</h1>
                    <form onSubmit={handleRegisterSubmit}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button type="submit" disabled={loading}>
                            Register
                        </button>
                    </form>
                    {error && <p>{error}</p>}
                    <div className='google-login'>
                        <GoogleOAuthProvider clientId="60153437629-j0ig1ntfbslgr7je2d5617fuqv10kh74.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onFailure={handleGoogleLoginFailure}
                            />
                        </GoogleOAuthProvider>
                    </div>
                    <p className='login'>Já tem conta? <Link to="/login">Entrar</Link></p>
                </div>
            </LoginStyles>
        </>
    );
};

export default Register;