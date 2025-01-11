import React, { useState } from 'react';
import Header from '../components/Header';
import ScheduleForm from './ScheduleForm';

const Content = () => {
    const [showForm, setShowForm] = useState(false);

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <>
            <Header />
            <div>
                <h1>Bem-vindo à Página Inicial</h1>
                <p>Esta é a página inicial do seu aplicativo.</p>
                <button onClick={handleToggleForm}>
                    {showForm ? 'Cancelar Registro de Horário' : 'Registrar Novo Horário'}
                </button>
                {showForm && <ScheduleForm />}
            </div>
        </>
    );
};

export default Content;