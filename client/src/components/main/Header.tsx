import { Link } from 'react-router-dom';
import logo from '../../image/logo.png';
import {
  MainHeader,
  HeaderBar,
  P,
  SignUp,
  Login,
  EatenImage,
  MyPage,
  Logout,
  AddPost,
} from './Main.style';

export const Header = () => {
  const handleLogout = () => {
    // 로그아웃 시
    localStorage.setItem('login', JSON.stringify(false));
  };

  const LoggedIn = localStorage.getItem('login');
  const IsLoggedIn = LoggedIn === 'true';
  const nickname = localStorage.getItem('nickname');

  return (
    <MainHeader>
      <HeaderBar>
        {IsLoggedIn ? (
          <>
            <P>{nickname}님</P>
            <Link to="/mypage">
              <MyPage>마이페이지</MyPage>
            </Link>
            <Link to="/">
              <Logout onClick={handleLogout} />
            </Link>
            <Link to="/new">
              <AddPost />
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup">
              <SignUp>회원가입</SignUp>
            </Link>
            <Link to="/login">
              <Login />
            </Link>
          </>
        )}
      </HeaderBar>
      <div>{<EatenImage src={logo} alt="로고 이미지" />}</div>
    </MainHeader>
  );
};
