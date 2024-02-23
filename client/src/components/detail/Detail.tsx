import { useEffect, useState } from 'react';
import { DetailHeater } from './DetailHeader';
import { DeleteModal } from '../modal';
import {
  DetailPost,
  DetailPage,
  Footer,
  Img,
  Text,
  Content,
  NicknameP,
  Date,
  Delete,
  Edit,
  Submit,
} from './Detail.style';
import { PostType } from '../post';
import { detail, EditPost } from '../../api/declaration';

export const Detail = () => {
  //const postId: number = 1;
  const [post, setPost] = useState<PostType | null>(null);

  const [postData, setPostData] = useState({
    userId: '',
    content: '',
    imagePath: '',
  });

  // useEffect(() => {
  //   const getPostDetails = async () => {
  //     try {
  //       const postData = await detail(postId);
  //       setPost(postData);
  //     } catch (error) {
  //       console.error('Error fetching post details:', error);
  //     }
  //   };

  //   getPostDetails();
  // }, [postId]);

  // if (!post) {
  //   return <div>Loading...</div>;
  // }

  const userId = localStorage.getItem('userId');

  const imgURL = 'https://placekitten.com/204/204';
  const text =
    '맛있어요 어쩌구 저쩌구fkfkfkfkfkkkkf라라라라라라라라러ㅣ라ㅓㅣㄹ너ㅣ어ㅏ리ㅏ러';
  const nickname = 'user12345';
  const date = '2024-12-10';
  const id = 'ewha';
  const edit_YN = true;

  const [isEditable, setIsEditable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = () => {
    setIsEditable(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUpdatePost = async (postId: string) => {
    setIsEditable(false);
    try {
      // postId와 함께 게시글 데이터를 전달하여 게시글 수정 요청
      const { msg, statusCode } = await EditPost(postId, postData);
      console.log(msg); // 서버에서 받은 메시지 출력

      // 요청이 성공하면 상태를 초기화하거나 필요한 작업 수행
      if (statusCode === 200) {
        // 성공한 경우 처리
        setPostData({
          userId: '',
          content: '',
          imagePath: '',
        });
      }
    } catch (error) {
      console.error('Error updating post:', error);
      // 요청이 실패한 경우에 대한 오류 처리
    }
  };

  return (
    <DetailPage>
      <div>
        <DetailHeater />
      </div>
      <DetailPost>
        <div>
          <Img src={imgURL} />
        </div>
        <Text>
          {userId === id && (
            <div>
              <Delete onClick={() => setModalOpen(true)}>삭제 /</Delete>
              {modalOpen && <DeleteModal onClose={handleCloseModal} />}
              <Edit onClick={handleChange}>편집</Edit>
            </div>
          )}
          <Content readOnly={!isEditable}>{text}</Content>
          {isEditable ? (
            <Submit onClick={() => handleUpdatePost('your-post-id')} />
          ) : (
            <>
              <NicknameP>{nickname}</NicknameP>
              <Date>{date}</Date>
              <div>{edit_YN ? '(수정됨)' : null}</div>
            </>
          )}
        </Text>
      </DetailPost>
      <div>
        <Footer />
      </div>
    </DetailPage>
  );
};
