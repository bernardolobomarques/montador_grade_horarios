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

    .logo-link {
        text-decoration: none;
        color: white;
    }

    .header__content {
        display: flex;
        align-items: center;
        font-size: 3rem;
        } 

    .profile-icon {
        display: flex;
        align-items: center;
        color: white;
        }

  }
`;

export default HeaderContainer;
