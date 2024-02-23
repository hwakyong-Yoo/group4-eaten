import styled, { css } from 'styled-components';
import Add_Image from '../../image/Add_Image.png';
import post_submit from '../../image/post_submit.png';
import back from '../../image/back.png';
import logout from '../../image/logout.png';
import orange_recipe from '../../image/orange_recipe.png';

export const AddPage = styled.div`
  display: grid;
  grid-templage-rows: 1fr 4fr 1fr;
`;

export const AddPost = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const noFocus = css`
  &:focus {
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  width: 350px;
  height: 60vh;
  font-size: 3em;
  padding-top: 8vh;
  padding-left: 3vw;
  line-height: 1.7;
  border: none;
  background-image: url(${orange_recipe});
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;

  ${noFocus}
`;

export const FileUpload = styled.label`
  display: inline-block;
  width: 500px;
  height: 500px;
  margin-left: 180px;
  background-color: white;
  background-image: url(${Add_Image});
  background-size: 20%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  cursor: pointer;
  border: 10px solid rgba(255, 178, 14, 1);
`;

export const ImageUpload = styled.input`
  display: none;
  position: relative;
  opacity: 0;
  z-index: 1;
`;

export const Image = styled.img`
  width: 30vw;
  height: 30vw;
  borderradius: 50%;
`;

export const Submit = styled.button`
  background-image: url(${post_submit});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0);
  border: none;

  position: absolute;
  right: 500px;
  bottom: 200px;
  width: 5vw;
  height: 5vw;
`;

export const Header = styled.header`
  background-color: white;
  text-align: center;
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
  width: 9vw;
  height: 7vh;
  border: none;
  cursor: pointer;
`;

export const NickName = styled.p`
  position: absolute;
  right: 13vw;
  top: 1vh;
  color: red;
  font-weight: bold;
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
