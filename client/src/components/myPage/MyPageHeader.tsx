import { Link } from 'react-router-dom';
import logo from '../../image/logo.png';
import {
  Header,
  EatenImage,
  Nickname,
  SettingButton,
  BackButton,
  LogoutButton,
} from './styles';

export const MyPageHeader: React.FC = () => {
  const handleLogout = () => {
    // 로그아웃 시
    localStorage.setItem('login', 'false')
    window.localStorage.removeItem('nickname')
  };

  const nickname = localStorage.getItem('nickname')

  return (
    <Header>
      <Link to="/">
        <BackButton />
      </Link>
      <div>
        <EatenImage src={logo} />
      </div>
      <div>
        <Nickname>{nickname}님</Nickname>
      </div>
      <Link to="/mypage/setting">
        <SettingButton />
      </Link>
      <Link to="/">
        <LogoutButton onClick={handleLogout}></LogoutButton>
      </Link>
    </Header>
  );
};
