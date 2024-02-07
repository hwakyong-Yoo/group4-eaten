import React from "react";
import { Link, useNavigate } from "react-router-dom";
import eaten from "./image/eaten.png";

interface HeaderProps {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserInfo {
  nickname: string;
}

const NewHeader: React.FC<HeaderProps> = ({
  isLoggedIn,
  userInfo,
  setLoggedIn,
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // 로그아웃 시
    setLoggedIn(false);
    navigate("/");
  };
  const navigateToBack = () => {
    navigate("/");
  };

  return (
    <header className="mypage-header">
      <button className="back-button" onClick={navigateToBack}></button>
      <div>
        <img src={eaten} alt="이튼 이미지" />
      </div>
      <div>
        <p className="mypage-nickname">{userInfo?.nickname}님</p>
      </div>
      <button className="logout-button" onClick={handleLogout}></button>
    </header>
  );
};

export default NewHeader;
