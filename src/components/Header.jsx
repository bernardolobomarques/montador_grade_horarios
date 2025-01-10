import React from 'react';
import HeaderContainer from './HeaderStyles';
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <HeaderContainer>
        <Link to={user ? '/content' : '/'} className='logo-link'>
          <h1>Montador de Cronograma</h1>
        </Link>
        <div className='header__content'>
          {user ? (
            <>
              <Link to='/profile' className='profile-icon'><VscAccount /></Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to='/login' className='profile-icon'><VscAccount /></Link>
          )}
        </div>
      </HeaderContainer>
    </>
  );
};

export default Header;