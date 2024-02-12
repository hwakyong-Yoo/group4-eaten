import {Link, useNavigate} from 'react-router-dom'
import './Setting.css'

const DeletePage = () => {
  const navigate = useNavigate()
  const navigateToNickname = () => {
    navigate('/mypage/nickname')
  }

  return (
    <div className="click-modal">
      <div></div>
      <div className="modal-content">
        <p>회원을 탈퇴하시겠습니까?</p>
        <button onClick={navigateToNickname}>예</button>
        <button>아니요</button>
      </div>
      <div></div>
    </div>
  )
}

export default DeletePage
