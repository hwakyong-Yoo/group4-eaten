import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const New: React.FC = () => {
  // 상태 설정
  const [image, setImage] = useState<File | null>(null)
  const [content, setContent] = useState('')
  const navigate = useNavigate()
  // 이미지 변경 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  // 내용 변경 핸들러
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  // 게시글 제출 핸들러
  const handleSubmit = () => {
    // 이미지와 내용을 이용하여 게시글을 제출하는 로직 구현
    console.log('Submitted:', {image, content})
    navigate('/')
  }

  return (
    <div className="new-post">
      <div>
        {/* 이미지 업로드 칸 */}
        <label htmlFor="file-upload" className="upload-button">
          업로드
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div>
        {/* 글 작성 칸 */}
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="게시글을 작성하세요..."
          rows={5}></textarea>

        {/* 완료 버튼 */}
        <button onClick={handleSubmit}>완료</button>
      </div>
    </div>
  )
}

export default New