import {Link} from 'react-router-dom'
import { useState } from 'react';
import { SettingBody, SettingForm, CheckButton } from './styles';
import {MyPageHeader} from '../MyPageHeader';

export const Nickname = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    localStorage.setItem('nickname', newValue);
  };


  return (
    <div>
      <div>
        <MyPageHeader />
      </div>
      <SettingBody>
        <div></div>
        <SettingForm>
          <p>변경하실 닉네임을 입력해 주세요</p>
          <input type="text" value={inputValue} onChange={handleInputChange} />
          <Link to="/mypage">
            <CheckButton />
          </Link>
        </SettingForm>
        <div></div>
      </SettingBody>
    </div>
  );
}
