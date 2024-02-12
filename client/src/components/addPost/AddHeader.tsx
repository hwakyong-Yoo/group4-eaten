import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CancelNew from '../modal/CancelNew';
// import eaten from '../../image/eaten.png';

interface HeaderProps {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserInfo {
  nickname: string;
}

export const AddHeader: React.FC<HeaderProps> = ({
  isLoggedIn,
  userInfo,
  setLoggedIn,
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // 로그아웃 시
    setLoggedIn(false);
    navigate('/');
  };
  const navigateToBack = () => {
    navigate('/');
  };
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
    // 뒤로 가는 로직을 추가할 수 있습니다.
  };

  return (
    <header className="mypage-header">
      <button className="back-button" onClick={() => setModalOpen(true)}></button>
      {modalOpen && <CancelNew onClose={handleCloseModal} />}
      <div>
        <img src="" alt="이튼 이미지" />
      </div>
      <div>
        <p className="mypage-nickname">{userInfo?.nickname}님</p>
      </div>
      <button className="logout-button" onClick={handleLogout}></button>
    </header>
  );
};
