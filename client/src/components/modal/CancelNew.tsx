import { Link } from 'react-router-dom';

type onCloseFunction = () => void;

interface ModalProps {
  onClose: onCloseFunction;
}

const CancelNew: React.FC<ModalProps> = ({ onClose }) => {
  const handleConfirm = () => {
    onClose(); // 뒤로 가는 함수 호출
  };

  return (
    <div className="modal">
      <p>작성 중인 내용이 삭제됩니다. 계속하시겠습니까?</p>
      <Link to='/'><button onClick={handleConfirm}>확인</button></Link>
    </div>
  );
};

export default CancelNew;
