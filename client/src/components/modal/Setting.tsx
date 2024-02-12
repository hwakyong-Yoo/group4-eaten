import React, { useState } from 'react';
import { NicknameModal } from './NicknameModal';

interface ModalProps {
  onClose: () => void;
}

const Setting: React.FC<ModalProps> = ({ onClose }) => {
  const [nicknameModalOpen, setNicknameModalOpen] = useState(false);

  const handleNicknameButtonClick = () => {
    setNicknameModalOpen(true); // NicknameModal 열기
    onClose(); // Setting 모달 닫기
  };

  return (
    <div className="click-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <button onClick={handleNicknameButtonClick}>닉네임 변경</button>
        <button>회원탈퇴</button>
      </div>
      {nicknameModalOpen && <NicknameModal onClose={() => setNicknameModalOpen(false)} />}
    </div>
  );
};

export default Setting;
