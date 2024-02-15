import styled from 'styled-components';
import Add_Image from '../../image/Add_Image.png';
import post_submit from '../../image/post_submit.png';
import back from '../../image/back.png';

export const AddPost = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const TextArea = styled.textarea`
  width: 25vw;
  height: 60vh;
  font-size: 4em;
`;

export const FileUpload = styled.label`
  display: inline-block;
  width: 30vw;
  height: 30vw;
  background-color: white;
  background-image: url(${Add_Image});
  background-size: 20%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  cursor: pointer;
  border: 10px solid rgba(255, 178, 14, 0.5);
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
  width: 7vw;
  height: 5vh;
  border: none;
  cursor: pointer;
`;

export const NickName = styled.p`
  position: absolute;
  right: 8vw;
  top: 1vh;
  color: red;
`;

export const Logout = styled.button`
  position: absolute;
  right: 1vw;
  top: 15vh;
  background-image: url('../../image/logout.png');
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
