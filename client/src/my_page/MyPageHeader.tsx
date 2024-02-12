import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../image/logo.png'
import Setting from '../modal/Setting'

interface HeaderProps {
  isLoggedIn: boolean
  userInfo: UserInfo | null
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

interface UserInfo {
  nickname: string
}

const MyPageHeader: React.FC<HeaderProps> = ({isLoggedIn, userInfo, setLoggedIn}) => {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const handleLogout = () => {
    // 로그아웃 시
    setLoggedIn(false)
    navigate('/')
  }
  const navigateToBack = () => {
    navigate('/')
  }
  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <header className="mypage-header">
      <button className="back-button" onClick={navigateToBack}></button>
      <div>
        <img src={logo} alt="로고 이미지" />
      </div>
      <div>
        <p className="mypage-nickname">{userInfo?.nickname}님</p>
      </div>
      <button className="gear-button" onClick={handleModalOpen}></button>
      {modalOpen && <Setting onClose={handleModalClose} />}
      <button className="logout-button" onClick={handleLogout}></button>
    </header>
  )
}

export default MyPageHeader
