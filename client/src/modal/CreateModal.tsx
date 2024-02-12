import {useEffect, useState} from 'react'

const CreateModal: React.FC<{isVisible: boolean}> = ({isVisible}) => {
  const [modalVisible, setModalVisible] = useState(isVisible)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isVisible) {
      setModalVisible(true)

      timeout = setTimeout(() => {
        setModalVisible(false)
      }, 2000)
    }

    return () => clearTimeout(timeout)
  }, [isVisible])

  return (
    <div className="modal" style={{display: modalVisible ? 'block' : 'none'}}>
      <div>회원가입이 완료되었습니다</div>
    </div>
  )
}

export default CreateModal
