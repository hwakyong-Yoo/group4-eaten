import styled, { css } from 'styled-components';
import back from '../../image/back.png';
import login_recipe from '../../image/login_recipe.png';
import submit from '../../image/submit.png';

export const LoginPage = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr;
  background-color: rgba(255, 178, 14, 0.26);
  height: 100vh;
  width: 100vw;
`;

export const Header = styled.div`
  background-color: white;
  width: 100%;
`;

export const EatenImage = styled.img`
  margin-left: 45%;
  width: 10%;
`;

export const BackButton = styled.button`
  position: absolute;
  left: 1vw;
  top: 2vh;
  background-image: url(${back});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: white;
  width: 7vw;
  height: 5vh;
  border: none;
  cursor: pointer;
`;

export const LoginBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  bottom: 0;
  justify-content: space-between;
`;

export const LoginForm = styled.div`
  width: 40vw;
  height: 75vh;
  background-image: url(${login_recipe});
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 100px;
  margin-top: 32px;
  background-color: rgba(255, 178, 14, 0);
`;

export const Fork = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 23vw;
`;

export const Spoon = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 23vw;
`;

export const H2 = styled.h2`
  position: absolute;
  left: 550px;
  top: 145px;
  color: orange;
`;

//Label======================

export const Label = styled.label`
  position: absolute;
  margin-top: 300px;
  margin-left: 60px;
  font-size: 1.2em;
`;

export const IdLabel = styled(Label)`
  bottom: 460px;
  left: 500px;
`;

export const PwdLabel = styled(Label)`
  bottom: 320px;
  left: 500px;
`;

//Input=========================

const noFocus = css`
  &:focus {
    outline: none;
  }
`;

export const Input = styled.input`
  border: none;

  position: absolute;
  width: 350px;
  height: 45px;
  font-size: 1.5em;
  background-color: rgba(0, 0, 0, 0);
  align-items: center;
  margin-left: 5vw;

  ${noFocus}
`;

export const IdInput = styled(Input)`
  bottom: 390px;
  left: 500px;
`;

export const PwdInput = styled(Input)`
  bottom: 250px;
  left: 500px;
`;

//---------------------------

export const Submit = styled.button`
  background-image: url(${submit});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: rgba(255, 178, 14, 0);
  border: none;
  width: 7vw;
  height: 7vw;

  position: absolute;
  left: 700px;
  bottom: 60px;
`;
