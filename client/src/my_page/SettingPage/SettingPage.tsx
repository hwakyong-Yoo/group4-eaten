import {Link, useNavigate} from 'react-router-dom'
import './Setting.css'

const SettingPage = () => {
  const navigate = useNavigate()

  const navigateToNickname = () => {
    navigate('/mypage/setting/nickname')
  }

  const navigateToDelete = () => {
    navigate('/mypage/setting/delete')
  }

  return (
    <div className="click-modal">
      <div></div>
      <div className="modal-content">
        <button onClick={navigateToNickname}>닉네임 변경</button>
        <button onClick={navigateToDelete}>회원탈퇴</button>
      </div>
      <div></div>
    </div>
  )
}

export default SettingPage
