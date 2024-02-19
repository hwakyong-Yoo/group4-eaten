import { Link } from 'react-router-dom';
import logo from '../../image/logo.png';

interface HeaderProps {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserInfo {
  nickname: string;
}

const MyPageHeader: React.FC<HeaderProps> = ({ setLoggedIn }) => {
  const handleLogout = () => {
    // 로그아웃 시
    localStorage.setItem('login', 'false')
    window.localStorage.removeItem('nickname')
  };

  const nickname = localStorage.getItem('nickname')

  return (
    <header className="mypage-header">
      <Link to='/'><button className="back-button" /></Link>
      
      <div>
        <img src={logo} alt="로고 이미지" />
      </div>
      <div>
        <p className="mypage-nickname">{nickname}님</p>
      </div>
      <Link to='/mypage/setting'><button className="gear-button"/></Link>
      <Link to='/'><button className="logout-button" onClick={handleLogout}></button></Link>
      
    </header>
  );
};

export default MyPageHeader;
