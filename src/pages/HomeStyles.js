import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #e0e0e0; /* Light gray background */
    min-height: 100vh; /* Full page height */

    .parallax {
        background-image: url('../media/agenda.webp'); /* Corrected image URL */
        height: 400px;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 2em;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .main-content, .about-us {
        max-width: 1200px;
        width: 100%;
        padding: 20px;
        background-color: #e0e0e0; /* Light gray background for content */
        margin-top: 20px;
        flex: 1; /* Take up remaining space */
    }

    .footer {
        margin-top: 20px;
        padding: 10px;
        background-color: #333;
        color: #fff;
        text-align: center;
    }
`;

export default Container;
