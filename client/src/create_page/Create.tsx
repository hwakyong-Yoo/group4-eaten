// Create.jsx
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Create.css'
import logo from '../image/logo.png'
import spoon from '../image/spoon.png'
import fork from '../image/fork.png'

interface LoginProps {
  isLoggedIn: boolean
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>
}

interface UserInfo {
  nickname: string
}

const Create: React.FC<LoginProps> = ({isLoggedIn, setLoggedIn, setUserInfo}) => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const navigate = useNavigate()

  const [showMessage, setShowMessage] = useState(false)
  const [showMessage8, setShowMessage8] = useState(false)

  const navigateToBack = () => {
    navigate('/')
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (e.target.value.length >= 8) {
      setShowMessage8(false)
    } else {
      setShowMessage8(true)
    }
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
    if (password !== e.target.value) {
      setShowMessage(true)
    } else {
      setShowMessage(false)
    }
  }

  const handleLogin = () => {
    if (id && password && password === confirmPassword && nickname) {
      setLoggedIn(true)
      setUserInfo({nickname})
      navigate('/login')
    } else {
      alert('입력 정보를 확인해주세요.')
    }
  }

  return (
    <div className="login">
      <div className="only-header">
        <button className="back-button" onClick={navigateToBack}></button>
        <img src={logo} alt="로고 이미지" />
      </div>
      <div className="create-page">
        {/* TODO: 회원가입, 로그인 창 디자인 수정 */}
        <div>
          <img className="fork" src={fork} alt="fork 이미지" />
        </div>
        <div className="signup-form">
          <h2>회원가입</h2>
          <label>아이디</label>
          <input type="text" value={id} onChange={e => setId(e.target.value)} />
          <button>중복체크</button>
          <label>비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {showMessage8 && (
            <p className="check-msg">비밀번호를 8자 이상 입력해 주세요.</p>
          )}
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {showMessage && <p className="check-msg">비밀번호가 일치하지 않습니다.</p>}
          <label>닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <button className="submit-button" onClick={handleLogin}></button>
        </div>
        <div>
          <img className="spoon" src={spoon} alt="spoon 이미지" />
        </div>
      </div>
    </div>
  )
}

export default Create
