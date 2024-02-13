
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../image/logo.png';
import spoon from '../../image/spoon.png';
import fork from '../../image/fork.png';
//import CreateModal from '../modal/CreateModal';
import '../signUp/SignUp.css';

// interface UserInfo {
//   nickname: string;
// }

export const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const navigateToBack = () => {
    navigate('/');
  };

  const handleLogin = () => {
    // 간단한 로그인 처리 로직
    if (id && password) {
      // 로그인 성공 시
      localStorage.setItem('login', JSON.stringify(true));
      localStorage.setItem('nickname', nickname)
      navigate('/'); // 메인 페이지로 이동
    } else {
      // 로그인 실패 시
      alert('입력 정보를 확인해주세요.');
    }
  };

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
          <h2>로그인</h2>
          <label>아이디</label>
          <input type="text" value={id} onChange={e => setId(e.target.value)} />
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="submit-button" onClick={handleLogin}></button>
        </div>
        <div>
          <img className="spoon" src={spoon} />
        </div>
        {/* <div>
          <CreateModal isVisible={isLoggedIn} />
        </div> */}
      </div>
    </div>
  );
};