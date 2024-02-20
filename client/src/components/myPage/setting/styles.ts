import styled from 'styled-components';
import orange_recipe from '../../../image/orange_recipe.png';
import check from '../../../image/check.png';

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
  margin-bottom: 10px;
  margin-top: 15vh;
  margin-left: 20vw;
  background-color: white;
  border: none;
  font-weight: bold;
`;

export const CheckButton = styled.button`
  background-image: url(${check});
  background-size: contain;
  background-repeat: no-repeat;

  width: 5vw;
  height: 5vw;
  font-size: 6em;
  background-color: rgba(255, 178, 14, 0);
  border: none;
`;
