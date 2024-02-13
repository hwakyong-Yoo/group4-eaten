import {Link} from 'react-router-dom';
import logo from '../../image/logo.png';

interface HeaderProps {
  isLoggedIn: boolean;
  userInfo: string | null;
}

export const Header: React.FC<HeaderProps> = () => {
  const handleLogout = () => {
    // 로그아웃 시
    localStorage.setItem('login', JSON.stringify(false));
  };

  const LoggedIn = localStorage.getItem('login')
  const IsLoggedIn = LoggedIn === 'true'
 const nickname = localStorage.getItem('nickname')
  return (
    <header className="header">
      <div className="header-bar">
        {IsLoggedIn ? (
          <>
            <p>{nickname}님</p>
            <Link to='/mypage'>
              <button id="mypage-button" >
              마이페이지
              </button>
            </Link>
            <Link to='/'><button id="header-logout-button" onClick={handleLogout}></button></Link>
            <Link to='/new'><button id="new-post"/></Link>
            
          </>
        ) : (
          <>
            <Link to="/signup">
             <button id="header-signup-button">회원가입</button>
            </Link>
            <Link to="/login">
             <button id="header-login-button"/>
            </Link>
            
          </>
        )}
      </div>
      <div className="header-logo">{<img src={logo} alt="로고 이미지" />}</div>
    </header>
  );
};
