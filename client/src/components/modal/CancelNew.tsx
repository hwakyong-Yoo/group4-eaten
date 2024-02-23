import { Link } from 'react-router-dom';
import { Modal, P, Button } from './Modal.style';

type onCloseFunction = () => void;

interface ModalProps {
  onClose: onCloseFunction;
}

const CancelNew = ({ onClose }: ModalProps) => {
  const handleConfirm = () => {
    onClose();
  };

  return (
    <Modal>
      <P>작성 중인 내용이 삭제됩니다. 계속하시겠습니까?</P>
      <Link to="/">
        <Button onClick={handleConfirm}>예</Button>
      </Link>
      /<Button onClick={handleConfirm}>아니오</Button>
    </Modal>
  );
};

export default CancelNew;
