import { useNavigate } from 'react-router-dom';
// import logo from '../image/logo.png';

interface HeaderProps {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserInfo {
  nickname: string;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, userInfo, setLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // 로그아웃 시
    setLoggedIn(false);
  };
  const navigateToMyPage = () => {
    // 마이페이지로 이동
    navigate('/mypage');
  };
  const navigateToCreate = () => {
    // 로그인 페이지로 이동
    navigate('/create');
  };
  const navigateToLogin = () => {
    // 로그인 페이지로 이동
    navigate('/login');
  };
  const navigateToNew = () => {
    navigate('/new');
  };

  return (
    <header className="header">
      <div className="header-bar">
        {isLoggedIn ? (
          <>
            <p>{userInfo?.nickname}님</p>
            <button id="mypage-button" onClick={navigateToMyPage}>
              마이페이지
            </button>
            <button id="header-logout-button" onClick={handleLogout}></button>
            <button id="new-post" onClick={navigateToNew}></button>
          </>
        ) : (
          <>
            <button id="header-signup-button" onClick={navigateToCreate}>
              회원가입
            </button>
            <button id="header-login-button" onClick={navigateToLogin}></button>
          </>
        )}
      </div>
      <div className="header-logo">{/* <img src={logo} alt="로고 이미지" /> */}</div>
    </header>
  );
};
