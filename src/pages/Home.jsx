import React, { useState } from 'react';
import Container from './HomeStyles';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Container>
                <div className="parallax">
                    <h1>Clockademia</h1>
                </div>
                <div className="main-content">
                    <h1>Bem-vindo à Clockademia</h1>
                    <p>
                        A Clockademia é uma plataforma online que permite a criação de horários de aulas para escolas e faculdades. Nosso gerador de agendas é uma ferramenta poderosa que facilita a organização do calendário escolar, garantindo que cada turma tenha um horário otimizado e que os professores possam ministrar suas aulas sem sobreposições. Com suporte para múltiplas turmas e disciplinas, nosso sistema é flexível e pode ser ajustado para atender às necessidades específicas de cada instituição de ensino.<br /><br />
                        Nosso objetivo é simplificar a gestão de horários escolares, proporcionando uma ferramenta intuitiva e eficiente para administradores e coordenadores. A Clockademia foi desenvolvida com foco na usabilidade, permitindo que qualquer pessoa, mesmo sem conhecimentos técnicos avançados, possa criar e ajustar horários de forma rápida e precisa. Além disso, nossa plataforma oferece suporte contínuo e atualizações regulares para garantir que você sempre tenha acesso às melhores funcionalidades e melhorias de desempenho.
                    </p>
                    <div className='jumper'>
                        <div><p>Venha conhecer mais da nossa ferramenta</p></div>
                    </div>
                    <Link to='/Login' className='botao de login'>Faça seu login</Link>
                </div>
                <div className="about-us">
                    <h2>Sobre Nós</h2>
                    <p>
                        Nosso gerador de agendas para escolas e faculdades é uma ferramenta poderosa que facilita a criação de horários de aulas. Ele considera diversos fatores, como a disponibilidade de professores, a necessidade de evitar conflitos de horários e a alocação de salas de aula. Com suporte para múltiplas turmas e disciplinas, nosso sistema garante que cada turma tenha um horário otimizado e que os professores possam ministrar suas aulas sem sobreposições. Além disso, o gerador é flexível e pode ser ajustado para atender às necessidades específicas de cada instituição de ensino.
                    </p>
                </div>
            </Container>
        </>
    );
};

export default Home;