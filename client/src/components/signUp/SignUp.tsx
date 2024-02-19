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
import IdExists from '../../api/signUp/IdExists';
import CreateSignUp from '../../api/signUp/SignUp';


export const SignUp: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
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

  //아이디 중복 체크
 const handleCheckDuplicate = async () => {
   setIsChecking(true);
   try {
     const exists = await IdExists(userId);
     setIsDuplicate(exists);
   } catch (error) {
     console.error('Error checking if user ID exists:', error);
   } finally {
     setIsChecking(false);
   }
 };

  // 로그인 로직
  const handleLogin = async  () => {
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

    try {
      // 사용자 정보를 AWS 서버에 전송하여 저장
      await CreateSignUp(nickname, userId, password);
      // 회원가입 성공 시 알림 메시지 등을 보여줄 수 있음
      alert('회원가입에 성공했습니다.');
    } catch (error) {
      // 회원가입 실패 시 에러 메시지 출력
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      console.error(error);
    }
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
          <br />
          <Input type="text" value={id} onChange={e => setId(e.target.value)} />
          <button onClick={handleCheckDuplicate} disabled={isChecking}>
            중복체크
            {isChecking ? 'Checking...' : 'Check Duplicate'}
          </button>
          {isDuplicate && (
            <p>This user ID is already taken. Please choose another one.</p>
          )}
          <br />
          <br />

          <Label>비밀번호</Label>
          {showErrorMessage && <CheckMsg>비밀번호를 8자 이상 입력해 주세요.</CheckMsg>}
          <br />
          <Input type="password" value={password} onChange={handlePasswordChange} />

          <br />
          <br />
          <Label>비밀번호 확인</Label>
          {showMessage && <CheckMsg>비밀번호가 일치하지 않습니다.</CheckMsg>}
          <br />
          <Input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <br />
          <br />
          <Label>닉네임</Label>
          <br />
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