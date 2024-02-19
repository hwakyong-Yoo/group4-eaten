import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Label,
  Input,
  Submit,
} from './styles';

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
      localStorage.setItem('nickname', nickname);
      navigate('/'); // 메인 페이지로 이동
    } else {
      // 로그인 실패 시
      alert('입력 정보를 확인해주세요.');
    }
  };

  return (
    <LoginPage>
      <Header>
        <BackButton onClick={navigateToBack} />
        <EatenImage src={logo} alt="로고 이미지" />
      </Header>
      <LoginBody>
        <div>
          <Fork src={fork} />
        </div>
        <LoginForm>
          <H2>로그인</H2>
          <Label>아이디</Label>
          <Input type="text" value={id} onChange={e => setId(e.target.value)} />
          <Label>비밀번호</Label>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Submit onClick={handleLogin} />
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
