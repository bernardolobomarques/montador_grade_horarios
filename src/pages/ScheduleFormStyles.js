import styled from 'styled-components';

const ScheduleFormStyles = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color:rgb(216, 216, 216);

    .main-div-schedule {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
        text-align: left;
    }

    .progress-bar {
        background: white;
        padding: 2rem;
        margin: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: fit-content;
        text-align: left;
        font-size: 1.5rem;
    }

   .progress-bar ul {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        list-style: none;
        padding: 0;
    } 

    .progress-bar ul li {
        margin-bottom: 1.5rem;
        cursor: pointer;
    }

    .progress-bar ul li:last-child {
        margin-bottom: 0;
    }

    .progress-bar ul li.active {
        color: #007bff;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
    }

    .input-field {
        width: 100%;
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

    .weekday-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .weekday-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .weekday-item input[type="checkbox"] {
        cursor: pointer;
    }	
`;

export { ScheduleFormStyles };