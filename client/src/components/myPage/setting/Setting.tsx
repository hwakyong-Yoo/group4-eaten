import { useNavigate } from 'react-router-dom';
import './Setting.css';

const Setting = () => {
  const navigate = useNavigate();

  const navigateToNickname = () => {
    navigate('/myPage/setting/nickname');
  };

  const navigateToDelete = () => {
    navigate('/myPage/setting/delete');
  };

  return (
    <div className="click-modal">
      <div></div>
      <div className="modal-content">
        <button onClick={navigateToNickname}>닉네임 변경</button>
        <button onClick={navigateToDelete}>회원탈퇴</button>
      </div>
      <div></div>
    </div>
  );
};

export default Setting;
