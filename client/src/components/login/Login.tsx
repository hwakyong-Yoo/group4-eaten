import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../image/logo.png';
import spoon from '../../image/spoon.png';
import fork from '../../image/fork.png';
// import CreateModal from '../modal/CreateModal';
import {
  LoginPage,
  Header,
  EatenImage,
  BackButton,
  LoginBody,
  Fork,
  Spoon,
  LoginForm,
  H2,
  Submit,
  IdLabel,
  PwdLabel,
  IdInput,
  PwdInput,
} from './Login.style';
import { loginUser } from '../../api/declaration';

export const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { success, nickname, error } = await loginUser(id, password);
      if (success) {
        // 로그인 성공 시
        console.log('로그인 성공! 사용자 닉네임:', nickname);
        if (nickname !== undefined) {
          localStorage.setItem('nickname', nickname);
        }
      } else {
        // 로그인 실패 시
        setLoginError(error || '아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 과정에서 오류가 발생했습니다:', error);
      setLoginError('로그인 과정에서 오류가 발생했습니다.');
    }

    if (id && password) {
      // 로그인 성공 시
      localStorage.setItem('login', JSON.stringify(true));
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('userId', id);
      navigate('/'); // 메인 페이지로 이동
    } else {
      // 로그인 실패 시
      alert('입력 정보를 확인해주세요.');
    }
  };

  return (
    <LoginPage>
      <Header>
        <Link to="/">
          <BackButton />
        </Link>
        <EatenImage src={logo} alt="로고 이미지" />
      </Header>
      <LoginBody>
        <div>
          <Fork src={fork} />
        </div>
        <LoginForm>
          <H2>로그인</H2>
          <IdLabel>아이디</IdLabel>
          <br />
          <IdInput type="text" value={id} onChange={e => setId(e.target.value)} />
          <br />
          <br />
          <PwdLabel>비밀번호</PwdLabel>
          <br />
          <PwdInput
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Submit onClick={handleLogin} />
          {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
        </LoginForm>
        <div>
          <Spoon src={spoon} />
        </div>
        {/* <div>
          <CreateModal isVisible={isLoggedIn} />
        </div> */}
      </LoginBody>
    </LoginPage>
  );
};
