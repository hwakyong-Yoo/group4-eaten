import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SettingBody, SettingForm, CheckButton, P, Input } from './Setting.style';
import { MyPageHeader } from '../MyPageHeader';
import { changeNickname } from '../../../api/declaration';

export const Nickname = () => {
  //const userId = localStorage.getItem('userId')
  const userId = 'ewha1';

  const [newNickname, setNewNickname] = useState('');
  const [error, setError] = useState('');

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 사용자의 닉네임을 수정하는 함수 호출
    const { success, error: errorMessage } = await changeNickname(userId, newNickname);
    if (success) {
      // 닉네임 수정 성공 시
      console.log('닉네임이 성공적으로 수정되었습니다.');
      localStorage.setItem('nickname', newNickname);
    } else {
      // 닉네임 수정 실패 시
      setError(errorMessage || '닉네임 수정에 실패했습니다.');
    }
  };

  return (
    <div>
      <div>
        <MyPageHeader />
      </div>
      <SettingBody>
        <div></div>
        <SettingForm>
          <form onSubmit={handleSubmit}>
            <P>변경하실 닉네임을 입력해 주세요</P>
            <Input type="text" value={newNickname} onChange={handleNicknameChange} />
            <Link to="/mypage">
              <CheckButton type="submit" />
            </Link>
          </form>
          {error && <div>{error}</div>}
        </SettingForm>
        <div></div>
      </SettingBody>
    </div>
  );
};
