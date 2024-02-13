import { Link } from 'react-router-dom';
import './Setting.css';

const Setting = () => {

  return (
    <div className="click-modal">
      <div></div>
      <div className="modal-content">
        <Link to='/mypage/setting/nickname'><button>닉네임 변경</button></Link>
        <Link to='/mypage/setting/delete'><button>회원탈퇴</button></Link>
      </div>
      <div></div>
    </div>
  );
};

export default Setting;
