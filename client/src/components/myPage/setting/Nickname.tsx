import {Link} from 'react-router-dom'
import { useState } from 'react';
import './Setting.css'

const NicknamePage = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    localStorage.setItem('nickname', newValue);
  };


  return (
    <div className="click-modal">
      <div></div>
      <div className="modal-content">
        <p>변경하실 닉네임을 입력해 주세요</p>
      <input
        type="text"
        id="myInput"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Link to="/mypage">
        <button className="check-button"/>
      </Link>
        
      </div>
      <div></div>
    </div>
  )
}

export default NicknamePage
