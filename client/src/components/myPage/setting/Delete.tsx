import { Link } from 'react-router-dom';
import { SettingBody, SettingForm } from './styles';
import {MyPageHeader} from '../MyPageHeader';

export const Delete = () => {

  return (
    <div>
      <div>
        <MyPageHeader />
      </div>
      <SettingBody>
        <div></div>
        <SettingForm>
          <p>회원을 탈퇴하시겠습니까?</p>
          <Link to="/">
            <button>예</button>
          </Link>
          <Link to="/mypage">
            <button>아니요</button>
          </Link>
        </SettingForm>
        <div></div>
      </SettingBody>
    </div>
  );
}
