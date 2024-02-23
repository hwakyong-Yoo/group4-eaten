import styled from 'styled-components';
import back from '../../image/back.png';
import logout from '../../image/logout.png';
import orange_recipe from '../../image/orange_recipe.png';

export const DetailPage = styled.div`
  display: grid;
  grid-templage-rows: 1fr 4fr 1fr;
`;

export const DetailPost = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const Img = styled.img`
  display: inline-block;
  width: 20vw;
  height: 20vw;
  padding: 5vw;
  margin-left: 10vw;
  background-color: white;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  cursor: pointer;
  border: 10px solid rgba(255, 178, 14, 1);
`;

export const Text = styled.div`
  width: 28vw;
  height: 30vw;
  background-color: rgba(0, 0, 0, 0);
  background-image: url(${orange_recipe});
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
  z-index: 2;
  text-align: center;

  display: grid;
  grid-template-rows: 4fr 1fr 1fr;
`;

export const Header = styled.header`
  background-color: white;
  text-align: center;
  height: 10vw;
`;

export const EatenImage = styled.img`
  margin-top: 2vh;
  width: 10vw;
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

export const NickName = styled.p`
  position: absolute;
  right: 13vw;
  top: 1vh;
  color: red;
`;

export const Logout = styled.button`
  position: absolute;
  right: 1vw;
  top: 1vh;
  background-image: url(${logout});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: white;
  width: 9vw;
  height: 6vh;
  border: none;
  cursor: pointer;
`;

export const Footer = styled.div`
  background-color: #ffad84;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 15vh;
`;
