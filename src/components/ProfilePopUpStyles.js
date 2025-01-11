import styled from 'styled-components';

export const PopUpContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 180px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
  overflow: hidden;
`;

export const PopUpItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
  color: black;
  
  &:hover {
    background-color: #333;
    color: white;
  }
`;
