import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../image/logo.png';
import spoon from '../../image/spoon.png';
import fork from '../../image/fork.png';
import {
  SignupPage,
  Header,
  EatenImage,
  SignupBody,
  Fork,
  Spoon,
  SignupForm,
  H2,
  Input,
  Label,
  Submit,
  Back,
  CheckMsg,
} from './styles';


export const SignUp: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());
    if (e.target.value.length >= 8) {
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);

    if (password !== e.target.value) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  };

  const handleLogin = () => {
    const isValidId = id.trim().length > 0;
    const isValidPassword =
      password.trim().length >= 8 && password.trim() === confirmPassword.trim();
    const isValidNickname = nickname.trim().length > 0;

    if (!(isValidId && isValidPassword && isValidNickname)) {
      alert('입력 정보를 확인해주세요.');
      return;
    }
    localStorage.setItem('nickname', nickname);
    navigate('/login');
  };

  return (
    <SignupPage>
      <Header>
        <Link to="/">
          <Back />
        </Link>
        <EatenImage src={logo} />
      </Header>
      <SignupBody>
        {/* TODO: 회원가입, 로그인 창 디자인 수정 */}
        <div>
          <Fork src={fork} />
        </div>
        <SignupForm>
          <H2>회원가입</H2>
          <Label>아이디</Label>
          <Input type="text" value={id} onChange={e => setId(e.target.value)} />
          <button>중복체크</button>
          <Label>비밀번호</Label>
          <Input type="password" value={password} onChange={handlePasswordChange} />
          {showErrorMessage && <CheckMsg>비밀번호를 8자 이상 입력해 주세요.</CheckMsg>}
          <Label>비밀번호 확인</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {showMessage && <CheckMsg>비밀번호가 일치하지 않습니다.</CheckMsg>}
          <Label>닉네임</Label>
          <Input
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <Submit onClick={handleLogin} />
        </SignupForm>
        <div>
          <Spoon src={spoon} />
        </div>
      </SignupBody>
    </SignupPage>
  );
};