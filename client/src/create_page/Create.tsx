// Create.jsx
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
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
  const navigateToBack = () => {
    navigate('/')
  }

  const handleLogin = () => {
    // 간단한 로그인 처리 로직
    if (id && password && password === confirmPassword && nickname) {
      // 로그인 성공 시
      setLoggedIn(true)
      setUserInfo({nickname})

      navigate('/login') // 메인 페이지로 이동
    } else {
      // 로그인 실패 시
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
        <div>
          <img className="fork" src={fork} />
        </div>
        <div className="signup-form">
          <h2>회원가입</h2>
          <label>아이디</label>
          <input type="text" value={id} onChange={e => setId(e.target.value)} />
          <button>중복체크</button>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <label>닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <button onClick={handleLogin}>제출</button>
        </div>
        <div>
          <img className="spoon" src={spoon} />
        </div>
      </div>
    </div>
  )
}

export default Create
