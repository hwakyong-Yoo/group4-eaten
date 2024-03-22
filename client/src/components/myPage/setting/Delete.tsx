import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SettingBody, SettingForm, P, YNButton } from './Setting.style';
import { MyPageHeader } from '../MyPageHeader';
import { deleteUser } from '../../../api/declaration';

export const Delete = () => {
  //const userId = localStorage.getItem('userId')
  const userId = 'ewha1';

  const [error, setError] = useState('');

  const handleDelete = async () => {
    // 회원 탈퇴 함수 호출
    const { success, error: errorMessage } = await deleteUser(userId);
    localStorage.setItem('login', JSON.stringify(false));
    localStorage.removeItem('userId');
    localStorage.removeItem('nickname');
    if (success) {
      // 회원 탈퇴 성공 시
      console.log('회원 탈퇴가 성공적으로 처리되었습니다.');
    } else {
      // 회원 탈퇴 실패 시
      setError(errorMessage || '회원 탈퇴에 실패했습니다.');
    }
    window.location.reload();
  };

  return (
    <div>
      <div>
        <MyPageHeader />
      </div>
      <SettingBody>
        <div></div>
        <SettingForm>
          <P>회원을 탈퇴하시겠습니까?</P>
          <Link to="/">
            <YNButton onClick={handleDelete}>예</YNButton>
            {error && <div>{error}</div>}
          </Link>
          /
          <Link to="/mypage">
            <YNButton>아니요</YNButton>
          </Link>
        </SettingForm>
        <div></div>
      </SettingBody>
    </div>
  );
};
