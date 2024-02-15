import { Link } from 'react-router-dom';
import { SettingBody, Button, SettingForm } from './styles';

const Setting = () => {

  return (
    <SettingBody>
      <div></div>
      <SettingForm>
        <Link to="/mypage/setting/nickname">
          <Button>닉네임 변경</Button>
        </Link>
        <Link to="/mypage/setting/delete">
          <Button>회원탈퇴</Button>
        </Link>
      </SettingForm>
      <div></div>
    </SettingBody>
  );
};

export default Setting;
