import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Add: React.FC = () => {
  // 상태 설정
  const [image, setImage] = useState<string | null>(null);
  const [content, setContent] = useState('');
  // 이미지 변경 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string) // 이미지 파일의 Data URL 저장
      }
      reader.readAsDataURL(file) // 선택한 파일을 Data URL로 읽기
    }
  }

  // 내용 변경 핸들러
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <div className="new-post">
      <div>
        {/* 이미지 업로드 칸 */}
        <label htmlFor="file-upload" className="upload-button">
          
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && (
          <img
            src={image}
            alt="Uploaded"
            style={{width: '30vw', height: '30vw', borderRadius: '50%'}}
          />
        )}{' '}
        {/* 이미지 미리보기 */}
      </div>
      <div>
        {/* 글 작성 칸 */}
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="게시글을 작성하세요..."
          rows={5}></textarea>

        {/* 완료 버튼 */}
        <Link to='/'><button >완료</button></Link>
        
      </div>
    </div>
  );
};
