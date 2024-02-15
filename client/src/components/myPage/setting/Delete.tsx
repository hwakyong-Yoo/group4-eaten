import { useNavigate } from 'react-router-dom';
import { SettingBody, SettingForm } from './styles';

const Delete = () => {
  const navigate = useNavigate()
  const navigateToMain = () => {
    navigate('/')
  }

  const navigateToMypage = () => {
    navigate('/mypage')
  }

  return (
    <SettingBody>
      <div></div>
      <SettingForm>
        <p>회원을 탈퇴하시겠습니까?</p>
        <button onClick={navigateToMain}>예</button>
        <button onClick={navigateToMypage}>아니요</button>
      </SettingForm>
      <div></div>
    </SettingBody>
  );
}

export default Delete;
