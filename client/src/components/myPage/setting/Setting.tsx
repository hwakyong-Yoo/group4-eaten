import { Link } from 'react-router-dom';
import { SettingBody, Button, SettingForm } from './Setting.style';
import { MyPageHeader } from '../MyPageHeader';

export const Setting = () => {
  return (
    <div>
      <div>
        <MyPageHeader />
      </div>
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
    </div>
  );
};
