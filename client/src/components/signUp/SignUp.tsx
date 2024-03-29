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
import checkUserIdExists from '../../api/signUp/IdExists'; // 수정된 파일 경로로 변경
import CreateSignUp from '../../api/signUp/SignUp';

export const SignUp: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());
    setShowErrorMessage(e.target.value.length < 8);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setShowMessage(password !== e.target.value);
  };

  const handleCheckDuplicate = async () => {
    setIsChecking(true);
    try {
      const { success, message } = await checkUserIdExists(id); // 함수 반환값 변경
      setIsDuplicate(!success);
      alert(message);
    } catch (error) {
      console.error('Error checking if user ID exists:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleLogin = async () => {
    const isValidId = id.trim().length > 0;
    const isValidPassword =
      password.trim().length >= 8 && password.trim() === confirmPassword.trim();
    const isValidNickname = nickname.trim().length > 0;

    if (!(isValidId && isValidPassword && isValidNickname && !isDuplicate)) {
      alert('입력 정보를 확인해주세요.');
      return;
    }

    localStorage.setItem('nickname', nickname);
    navigate('/login');

    try {
      await CreateSignUp(nickname, id, password); // userId -> id로 수정
      alert('회원가입에 성공했습니다.');
    } catch (error) {
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
