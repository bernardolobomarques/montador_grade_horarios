import React, { useState, useRef, useEffect } from 'react';
import HeaderContainer from './HeaderStyles';
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from 'react-router-dom';
import ProfilePopUp from './ProfilePopUp';

const Header = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const togglePopUp = (e) => {
    e.stopPropagation();
    setShowPopUp(!showPopUp);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopUp(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <HeaderContainer style={{ zIndex: 1 }}>
        <Link to={user ? '/content' : '/'} className='logo-link'>
          <h1>Montador de Cronograma</h1>
        </Link>
        <div className='header__content' ref={popupRef}>
          {user ? (
            <>
              <div className='profile-icon' onClick={togglePopUp}>
                <VscAccount />
              </div>
              {showPopUp && <ProfilePopUp onClose={() => setShowPopUp(false)} />}
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