import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #e0e0e0; /* Light gray background */
    min-height: 90vh; /* Full page height */

    .parallax {
        background-image: url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0');
        height: 40vh;
        width: 100%;
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

    .jumper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 100%;
        padding-top: 20px;
    }

    .jumper div {
        margin: 0 10px;
        background-color: rgba(255, 230, 0, 0.9);
        font-size: 2em;
    }

`;

export default Container;
