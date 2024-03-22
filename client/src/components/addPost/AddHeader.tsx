import { useState } from 'react';
import { Link } from 'react-router-dom';
import CancelNew from '../modal/CancelNew';
import eaten from '../../image/eaten.png';
import { Header, EatenImage, BackButton, NickName, Logout } from './Add.style';

export const AddHeader = () => {
  const handleLogout = () => {
    // 로그아웃 시
    localStorage.setItem('login', 'false');
    window.localStorage.removeItem('nickname');
  };
  const [modalOpen, setModalOpen] = useState(false);
  const nickname = localStorage.getItem('nickname');

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Header>
      <BackButton onClick={() => setModalOpen(true)} />
      {modalOpen && <CancelNew onClose={handleCloseModal} />}
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
