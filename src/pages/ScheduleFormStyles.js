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

    .input-field[type="time"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        width: 100%;
        transition: border-color 0.3s ease;
        font-size: 1rem;
        color: #333;
        background-color: #fff;
    }

    .input-field[type="time"]:focus {
        border-color: #ff6f61;
        outline: none;
    }
    
    .close-button {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #ff6f61;
        border-radius: 20%;
        border: 1px solid #ff6f61;
    }

    .close-button:hover {
        color: #e65c50;
    }

        .group-subject {
        display: flex;
        gap: 1rem;
        align-items: flex-end;
    }
    
    #addbutton {
        margin: auto;
        height: 2.5rem;
        padding: 0.5rem;
        border: none;
        border-radius: 8px;
        background-color: #ff6f61;
        color: #ffffff;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .error-message {
        color: red;
        font-size: 0.875rem;
        margin-top: -1rem;
        margin-bottom: 1rem;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }

    .subjects {
        border: 1px solid #ddd;
        min-height: 2rem;
        min-width: 100%;
        background-color:rgba(255, 110, 97, 0.16);
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .added-subjects-container{
        text-align: left;
        width: 100%;
    }

    .added-subjects {
        box-sizing: border-box;
        display: flex;
        width: 100%;
        text-align: left;
        padding: 1rem 1.5rem;
    }
    
    .added-subjects button {
        padding: 0;
        margin: 0;
        size: 0.5rem;
        background: none;
        border: none;
        cursor: pointer;
        color: #ff6f61;
        margin-leftt: auto;

    }


    #added-subjects-p{
        display: flex;
        justify-content: space-between;
        align-items: center;
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