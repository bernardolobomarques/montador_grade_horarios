import styled from 'styled-components';

const ScheduleFormStyles = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    background-color: #ffffff;
    padding: 2rem;

    .progress-bar {
        background: #ffffff;
        padding: 1rem;
        border-radius: 12px;
        width: 200px;
        text-align: center;
        font-size: 1.25rem;
        position: fixed;
        top: 50%;
        left: 2rem;
        transform: translateY(-50%);
    }

    .progress-bar ul {
        display: flex;
        flex-direction: column;
        list-style: none;
        padding: 0;
        margin: 0;
    } 

    .progress-bar ul li {
        margin-bottom: 1rem;
        cursor: pointer;
        transition: color 0.3s ease, background-color 0.3s ease;
        padding: 0.5rem;
        border-radius: 8px;
    }

    .progress-bar ul li.active {
        color: #ffffff;
        background-color: #ff6f61;
        font-weight: bold;
    }

    .progress-bar ul li:not(.active):hover {
        background-color: #f0f0f0;
    }

    .main-div-schedule {
        background: #ffffff;
        padding: 2.5rem;
        border-radius: 12px;
        width: 100%;
        max-width: 600px;
        text-align: center;
        margin-left: 250px; /* Space for the progress bar */
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .input-group {
        width: 100%;
        max-width: 500px;
        margin-bottom: 1.5rem;
        text-align: left;
    }

    label {
        display: block;
        margin-bottom: 0.75rem;
        font-weight: bold;
        color: #333;
    }

    .input-field {
        box-sizing: border-box;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        width: 100%;
        transition: border-color 0.3s ease;
    }

    .input-field:focus {
        border-color: #ff6f61;
        outline: none;
    }

    button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        background-color: #ff6f61;
        color: #ffffff;
        cursor: pointer;
        margin-bottom: 1rem;
        transition: background-color 0.3s ease;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    button:not(:disabled):hover {
        background-color: #e65c50;
    }

    .weekday-container {
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-radius: 10px;
    }

    .weekday-item {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .weekday-item input[type="checkbox"] {
        appearance: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: .5px solid #ff6f61;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .weekday-item input[type="checkbox"]:checked {
        background-color: rgb(255, 125, 125);
    }

    .weekday-item label {
        margin-bottom: 0;
        position: absolute;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        pointer-events: none;
    }

    #time-container {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
        .main-div-schedule {
            width: 90%;
            padding: 1.5rem;
            margin-left: 0;
        }

        .progress-bar {
            position: static;
            transform: none;
            margin-bottom: 2rem;
        }

        #time-container {
            flex-direction: column;
            gap: 1rem;
        }
    }
`;

export { ScheduleFormStyles };