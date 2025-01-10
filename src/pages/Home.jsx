import React from 'react';
import Container from './HomeStyles';
import Header from '../components/Header';

const Home = () => {
    return (
        <>
            <Header />
            <Container>
                <div className="parallax">
                    <h1>MONTADOR DE CALENDARIO ACADÊMICO</h1>
                </div>
                <div className="main-content">
                    <h1>Bem-vindo à Nossa Página Inicial</h1>
                    <p>Esta é uma página inicial simples criada com React e styled-components.</p>
                </div>
                <div className="about-us">
                    <h2>Sobre Nós</h2>
                    <p>
                        Nosso gerador de agendas para escolas e faculdades é uma ferramenta poderosa que facilita a criação de horários de aulas. Ele considera diversos fatores, como a disponibilidade de professores, a necessidade de evitar conflitos de horários e a alocação de salas de aula. Com suporte para múltiplas turmas e disciplinas, nosso sistema garante que cada turma tenha um horário otimizado e que os professores possam ministrar suas aulas sem sobreposições. Além disso, o gerador é flexível e pode ser ajustado para atender às necessidades específicas de cada instituição de ensino.
                    </p>
                </div>
                <div className="footer">
                    <p>&copy; 2023 Sua Empresa. Todos os direitos reservados.</p>
                </div>
            </Container>
        </>
    );
};

export default Home;