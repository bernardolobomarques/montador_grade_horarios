import styled from 'styled-components';

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9; /* Light background for content */
    min-height: 90vh; /* Full page height */

    h1 {
        color: #333; /* Dark text color for headings */
    }

    p {
        color: #666; /* Gray text color for paragraphs */
        max-width: 800px; /* Limit paragraph width */
        text-align: center; /* Center align text */
    }

    .schedule-form {
        margin-top: 20px;
        padding: 20px;
        background-color: #fff; /* White background for form */
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 600px; /* Limit form width */
    }
`;

export default ContentContainer;