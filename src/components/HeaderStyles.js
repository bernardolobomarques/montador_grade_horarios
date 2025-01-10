import styled from 'styled-components';

const HeaderContainer = styled.header`
    * {
    margin: 0; 
    padding: 0;
    box-sizing: border-box;
    }
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #333;
    color: white;

    .header__content {
        display: flex;
        align-items: center;
        font-size: 3rem; /* Adjust the size to match the h1 font size */
        text-decoration: none;
        color: white;
    } 

    .profile-icon {
        font-size: 2rem;
        margin-left: 1rem;
        color: white;
    }

  }
`;

export default HeaderContainer;
