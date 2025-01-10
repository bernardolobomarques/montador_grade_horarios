import React from 'react';
import HeaderContainer from './HeaderStyles';
import { VscAccount } from "react-icons/vsc";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
        <HeaderContainer>
            <Link to='/' className='logo-link'><h1>Montador de Cronograma</h1></Link>
            <div className='header__content'>
                <Link to='/Profile' className='profile-icon' > <VscAccount /></Link>
            </div>
        </HeaderContainer>
    </>
  );
};

export default Header;
