import styled from 'styled-components';
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
  height: 80vh;
  background-image: url(${orange_recipe});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: rgba(255, 178, 14, 0);
`;

export const Input = styled.input`
  border-bottom: 1px solid orange;
  border-left: none;
  border-right: none;
  border-top: none;
  width: 30vw;

  align-items: center;
  margin-left: 6vw;
`;

export const Label = styled.label`
  padding-left: 6vw;
`;

export const Submit = styled.button`
  background-image: url(${submit});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: rgba(255, 178, 14, 0);
  border: none;
  width: 7vw;
  height: 7vw;

  position: absolute;
  left: 50%;
  bottom: 15%;
`;

export const H2 = styled.h2`
  color: orange;
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

export const CheckMsg = styled.p`
  color: orange;
  font-size: 1em;
  width: 40vw;
  margin-right: 30vw;
`;
