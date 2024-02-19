import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AddPost, FileUpload, TextArea, ImageUpload, Image, Submit, Footer } from './styles';

export const Add: React.FC = () => {
  // 상태 설정
  const [image, setImage] = useState<string | null>(null);
  const [content, setContent] = useState('');
  // 이미지 변경 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string); // 이미지 파일의 Data URL 저장
      };
      reader.readAsDataURL(file); // 선택한 파일을 Data URL로 읽기
    }
  };

  // 내용 변경 핸들러
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <AddPost>
      <div>
        {/* 이미지 업로드 칸 */}
        <FileUpload htmlFor="file-upload"></FileUpload>
        <ImageUpload type="file" accept="image/*" onChange={handleImageChange} />
        {image && <Image src={image} alt="Uploaded" />} {/* 이미지 미리보기 */}
      </div>
      <div>
        {/* 글 작성 칸 */}
        <TextArea
          value={content}
          onChange={handleContentChange}
          placeholder="게시글을 작성하세요..."
          rows={5}></TextArea>

        {/* 완료 버튼 */}
        <Link to="/">
          <Submit />
        </Link>
      </div>
      <Footer/>
    </AddPost>
  );
};
