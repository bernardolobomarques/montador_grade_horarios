import React, { useEffect } from 'react';
import { PopUpContainer, PopUpItem } from './ProfilePopUpStyles';
import { useNavigate } from 'react-router-dom';

const ProfilePopUp = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.stopPropagation();
    localStorage.removeItem('user');
    navigate('/login');
    onClose();
  };

  const handleClickOutside = (event) => {
    if (event.target.closest('.popup-container') === null) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <PopUpContainer className="popup-container" onClick={(e) => e.stopPropagation()}>
      <PopUpItem>My account</PopUpItem>
      <PopUpItem>My projects</PopUpItem>
      <PopUpItem onClick={handleLogout}>Logout</PopUpItem>
    </PopUpContainer>
  );
};

export default ProfilePopUp;
