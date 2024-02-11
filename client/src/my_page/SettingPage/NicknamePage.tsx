import {Link, useNavigate} from 'react-router-dom'
import './Setting.css'

const NicknamePage = () => {
  const navigate = useNavigate()
  const navigateToMypage = () => {
    navigate('/mypage')
  }

  return (
    <div className="click-modal">
      <div></div>
      <div className="modal-content">
        <p>변경하실 닉네임을 입력해 주세요</p>
        <input type="text" />
        <button onClick={navigateToMypage} className="check-button"></button>
      </div>
      <div></div>
    </div>
  )
}

export default NicknamePage
