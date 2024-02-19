import { Link } from 'react-router-dom';
import { Modal } from './styles';

type onCloseFunction = () => void;

interface ModalProps {
  onClose: onCloseFunction;
}

const CancelNew: React.FC<ModalProps> = ({ onClose }) => {
  const handleConfirm = () => {
    onClose(); // 뒤로 가는 함수 호출
  };

  return (
    <Modal>
      <p>작성 중인 내용이 삭제됩니다. 계속하시겠습니까?</p>
      <Link to="/">
        <button onClick={handleConfirm}>확인</button>
      </Link>
    </Modal>
  );
};

export default CancelNew;
