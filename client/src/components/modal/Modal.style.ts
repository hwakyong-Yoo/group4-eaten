import styled from 'styled-components';
import modal from '../../image/modal.png';

export const Modal = styled.div`
  background-image: url(${modal});
  background-size: contain;
  background-repeat: no-repeat;
  font-size: 2vw;
  position: absolute;
  left: 50vw;
  top: 50vh;
  height: 400px;
  width: 600px;
  background-color: rgba(0, 0, 0, 0);
  transform: translate(-50%, -50%);
`;

export const P = styled.p`
  text-align: center;
  margin-top: 120px;
  margin-left: 100px;
  width: 400px;
`;

export const Button = styled.button`
  background-color: white;
  border: none;
  font-weight: bold;
`;
