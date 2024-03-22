import styled from 'styled-components';
import gear from '../../image/gear.png';
import back from '../../image/back.png';
import logout from '../../image/logout.png';

export const H1 = styled.h1`
  color: red;
`;

export const Header = styled.header`
  background-color: white;
  text-align: center;
  height: 20vh;
`;

export const EatenImage = styled.img`
  margin-top: 2vh;
  width: 10vw;
`;

export const Nickname = styled.p`
  position: absolute;
  right: 150px;
  top: 15px;
  color: red;
  font-weight: bold;
`;

export const SettingButton = styled.button`
  position: absolute;
  right: 1vw;
  top: 2vh;
  background-image: url(${gear});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: white;
  width: 8vw;
  height: 8vh;
  border: none;
  cursor: pointer;
`;

export const BackButton = styled.button`
  position: absolute; /* 절대 위치 지정 */
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

export const LogoutButton = styled.button`
  position: absolute;
  right: 80px;
  top: 80px;
  background-image: url(${logout});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0);
  width: 7vw;
  height: 6vh;
  border: none;
  cursor: pointer;
`;

export const PostList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const MyPost = styled.div`
  background-color: rgba(255, 178, 14, 0.3);
`;
