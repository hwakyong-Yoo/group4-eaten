import styled, { css } from 'styled-components';
import orange_recipe from '../../../image/orange_recipe.png';
import check from '../../../image/check.png';

// Setting=======================================

export const SettingBody = styled.div`
  position: fixed;
  bottom: 0;
  height: 68vh;
  margin-top: 6vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: rgba(255, 178, 14, 0.26);
  text-align: center;
`;

export const SettingForm = styled.div`
width: 50vw;
  height: 70vh;
  background-image: url(${orange_recipe});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  
}`;

export const Button = styled.button`
  display: block; /* 각 버튼을 한 줄에 하나씩 표시 */
  margin-top: 15vh;
  margin-left: 20vw;
  background-color: white;
  border: none;
  font-weight: bold;
  font-size: 2em;
  text-align: center;
`;

//Nickname==================================

export const P = styled.p`
  margin-top: 200px;
  margin-left: 10px;
  font-size: 1.3em;
`;

const noFocus = css`
  &:focus {
    outline: none;
  }
`;

export const Input = styled.input`
  height: 70px;
  width: 300px;
  background-color: rgba(255, 178, 14, 0);
  font-size: 2.2em;
  border: none;

  ${noFocus}
`;

export const CheckButton = styled.button`
  background-image: url(${check});
  background-size: contain;
  background-repeat: no-repeat;

  position: absolute;
  left: 700px;
  bottom: 90px;
  width: 5vw;
  height: 5vw;
  font-size: 6em;
  background-color: rgba(255, 178, 14, 0);
  border: none;
`;

//Delete===========================================

export const YNButton = styled.button`
  border: none;
  font-size: 1.3em;
  margin-top: 30px;
  margin-left: 10px;
  background-color: rgba(0, 0, 0, 0);
`;
