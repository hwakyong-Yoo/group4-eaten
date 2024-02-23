import styled, { css } from 'styled-components';
import orange_recipe from '../../image/orange_recipe.png';
import submit from '../../image/submit.png';
import back from '../../image/back.png';

export const SignupPage = styled.div`
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

export const SignupBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  bottom: 0;
  justify-content: space-between;
`;

export const SignupForm = styled.div`
  width: 40vw;
  height: 75vh;
  background-image: url(${orange_recipe});
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 100px;
  margin-top: 32px;
  background-color: rgba(255, 178, 14, 0);
`;

//Input==============================

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
  bottom: 460px;
  left: 500px;
`;

export const PwdInput = styled(Input)`
  bottom: 380px;
  left: 500px;
`;

export const PwdCheckInput = styled(Input)`
  bottom: 290px;
  left: 500px;
`;

export const NicknameInput = styled(Input)`
  bottom: 210px;
  left: 500px;
`;

//Label================================

export const Label = styled.label`
  position: absolute;
  margin-top: 300px;
  margin-left: 60px;
  font-size: 1.2em;
`;

export const IdLabel = styled(Label)`
  bottom: 510px;
  left: 500px;
`;

export const PwdLabel = styled(Label)`
  bottom: 430px;
  left: 500px;
`;

export const PwdCheckLabel = styled(Label)`
  bottom: 350px;
  left: 500px;
`;

export const NicknameLabel = styled(Label)`
  bottom: 260px;
  left: 500px;
`;

//---------------------------------------

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

export const H2 = styled.h2`
  position: absolute;
  left: 550px;
  top: 145px;
  color: orange;
`;

export const Duplicate = styled.button`
  border: none;
  background-color: white;
  position: absolute;
  left: 800px;
  top: 210px;
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

export const Back = styled.button`
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

//CheckMsg==============================

export const CheckMsg = styled.p`
  position: absolute;
  color: orange;
  font-size: 1em;
  width: 40vw;
  margin-right: 30vw;
`;

export const CheckMsg1 = styled(CheckMsg)`
  top: 270px;
  left: 650px;
`;

export const CheckMsg2 = styled(CheckMsg)`
  top: 353px;
  left: 700px;
`;

export const Img = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 210px;
  left: 870px;
`;
