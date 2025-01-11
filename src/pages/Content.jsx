import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Content = () => {
    return (
        <>
            <Header />
            <div>
                <h1>Bem-vindo à Página Inicial</h1>
                <p>Esta é a página inicial do seu aplicativo.</p>
                <Link to="/schedule">Agendar</Link>
            </div>
        </>
    );
};

export default Content;