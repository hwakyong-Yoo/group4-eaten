import styled from 'styled-components';
import login from '../../image/login.png';
import logout from '../../image/logout.png';
import newpost from '../../image/newpost.png';

// Main=================================

export const PopularPost = styled.div`
  width: 100%;
  height: 60vh;
`;

export const NewPost = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 0;

  background: linear-gradient(to bottom, white, #ffad84);
`;

//Header=================================

export const MainHeader = styled.header`
  display: grid;
  grid-template-rows: 7vh 30vh;
  width: 100%;
  height: 30vh;
  text-align: center;
  background-color: rgba(255, 178, 14, 0.5);
`;

export const HeaderBar = styled.div`
  background-color: rgba(255, 178, 14, 0.26);
  text-align: right;
  height: 50px;
`;

export const SignUp = styled.button`
  position: absolute;
  right: 100px;
  top: 10px;
  color: red;
  background-color: rgba(255, 178, 14, 0);
  font-weight: bold;
  cursor: pointer;
  width: 10vw;
  height: 4vh;
  border: none;
`;

export const Login = styled.button`
  margin-right: 2vw;
  margin-top: 1vh;
  background-image: url(${login});
  background-color: rgba(255, 178, 14, 0);
  background-size: contain;
  background-repeat: no-repeat;
  width: 6vw;
  height: 10vh;
  border: none;
  cursor: pointer;
`;

export const EatenImage = styled.img`
  width: 10%;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const P = styled.p`
  position: absolute;
  right: 280px;
  color: red;
  font-weight: bold;
`;

export const MyPage = styled.button`
  background-color: rgba(255, 178, 14, 0);
  position: absolute;
  color: red;
  font-weight: bold;
  top: 15px;
  right: 150px;
  border: none;
`;

export const Logout = styled.button`
  position: absolute;
  right: 1vw;
  top: 1vh;
  background-image: url(${logout});
  background-color: rgba(255, 178, 14, 0);
  background-size: contain;
  background-repeat: no-repeat;
  width: 6vw;
  height: 5vh;
  border: none;
  cursor: pointer;
`;

export const AddPost = styled.button`
  position: absolute;
  right: 1vw;
  top: 18vh;
  background-image: url(${newpost});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: rgba(255, 178, 14, 0);
  width: 10vw;
  height: 20vh;
  border: none;
  cursor: pointer;
`;
