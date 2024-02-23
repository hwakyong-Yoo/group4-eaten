import { Link } from 'react-router-dom';
import eaten from '../../image/eaten.png';
import { Header, EatenImage, BackButton, NickName, Logout } from './Detail.style';

export const DetailHeater = () => {
  const handleLogout = () => {
    // 로그아웃 시
    localStorage.setItem('login', 'false');
    window.localStorage.removeItem('nickname');
  };

  const nickname = localStorage.getItem('nickname');

  return (
    <Header>
      <Link to="/">
        <BackButton />
      </Link>
      <div>
        <EatenImage src={eaten} alt="이튼 이미지" />
      </div>
      <div>
        <NickName>{nickname}님</NickName>
      </div>
      <Link to="/">
        <Logout onClick={handleLogout} />
      </Link>
    </Header>
  );
};
