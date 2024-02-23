import React, { useState } from 'react';
import {
  AddPost,
  AddPage,
  FileUpload,
  TextArea,
  ImageUpload,
  Image,
  Submit,
  Footer,
} from './Add.style';
import { AddHeader } from './AddHeader';
import { addPost } from '../../api/declaration';

export const Add = () => {
  // 상태 설정
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [content, setContent] = useState('');

  // 이미지 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);

      // 이미지 파일을 읽기
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // 기본 이벤트 방지

    //const userId = localStorage.getItem('userId');
    const userId = 'ewha';

    try {
      if (!image) {
        throw new Error('이미지를 선택해주세요.');
      }

      // 서버로 새 게시물을 생성하는 요청 보내기
      const response = await addPost(userId, content, image);
      console.log('새 게시물이 성공적으로 작성되었습니다:', response);

      // 폼 초기화
      setContent('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      // 게시물 작성에 실패했을 때 에러 처리
      console.error('Error creating post:', error);
    }
  };

  return (
    <AddPage>
      <div>
        <AddHeader />
      </div>
      <form onSubmit={handleSubmit}>
        <AddPost>
          <div>
            {/* 이미지 업로드 칸 */}
            <FileUpload htmlFor="file-upload"></FileUpload>
            <ImageUpload type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && <Image src={imagePreview} alt="Uploaded" />}
            {/* 이미지 미리보기 */}
          </div>
          <div>
            {/* 글 작성 칸 */}
            <TextArea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="게시글을 작성하세요..."
              rows={5}></TextArea>

            {/* 완료 버튼 */}
            <Submit type="submit" />
          </div>
        </AddPost>
      </form>

      <div>
        <Footer />
      </div>
    </AddPage>
  );
};
