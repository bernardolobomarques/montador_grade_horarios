import styled from 'styled-components';

const LoginStyles = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color:rgb(216, 216, 216);

    .home-button {
        position: absolute;
        top: 1rem;
        left: 1rem;
        text-align: left;
        text-decoration: none;
        color: black;
        background-color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .home-button a {
        text-decoration: none;
        color: black;
    }

    .main-div-login {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    input {
        margin-bottom: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        padding: 0.5rem;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        margin-bottom: 0.5rem;
    }

    button:disabled {
        background-color: #ccc;
    }

    .google-login {
        margin-top: 0.5rem;
    }

    p {
        color: red;
    }

    p.register, p.login {
        margin-top: 1rem;
        color: black;
    }
`;

export { LoginStyles };