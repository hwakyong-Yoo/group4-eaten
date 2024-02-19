import { useNavigate } from 'react-router-dom';
import './Setting.css';

const Delete = () => {
  const navigate = useNavigate()
  const navigateToMain = () => {
    navigate('/')
  }

  const navigateToMypage = () => {
    navigate('/mypage')
  }

  return (
    <div className="click-modal">
      <div></div>
      <div className="modal-content">
        <p>회원을 탈퇴하시겠습니까?</p>
        <button onClick={navigateToMain}>예</button>
        <button onClick={navigateToMypage}>아니요</button>
      </div>
      <div></div>
    </div>
  )
}

export default Delete;
