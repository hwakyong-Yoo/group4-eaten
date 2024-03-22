import { Link } from 'react-router-dom';
import { Modal, P, Button } from './Modal.style';
import { deletePost } from '../../api/post/deletePost';

type onCloseFunction = () => void;

interface ModalProps {
  onClose: onCloseFunction;
}

export const DeleteModal = ({ onClose }: ModalProps) => {
  const handleConfirm = () => {
    onClose();
  };

  const handleDeleteClick = () => {
    const postId = '게시물의 ID';
    const userId = '사용자의 ID';
    deletePost(postId, userId);
    onClose();
  };

  return (
    <Modal>
      <P>게시글을 삭제하시겠습니까?</P>
      <Link to="/mypage">
        <Button onClick={handleDeleteClick}>예</Button>
      </Link>
      /<Button onClick={handleConfirm}>아니오</Button>
    </Modal>
  );
};
