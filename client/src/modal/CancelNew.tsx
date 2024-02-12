import {useNavigate} from 'react-router-dom'

type onCloseFunction = () => void

interface ModalProps {
  onClose: onCloseFunction
}

const CancelNew: React.FC<ModalProps> = ({onClose}) => {
  const navigate = useNavigate()
  const handleConfirm = () => {
    onClose() // 뒤로 가는 함수 호출
    navigate('/')
  }
  const handleCloseModal = () => {
    onClose()
  }

  return (
    <div className="modal">
      <p>게시글을 삭제하시겠습니까?</p>
      <button onClick={handleConfirm}>예</button>
      <button onClick={handleCloseModal}>아니요</button>
    </div>
  )
}

export default CancelNew
