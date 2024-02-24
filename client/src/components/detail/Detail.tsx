import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  Edit_Y,
  PostReaction,
  Emoji,
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

  const imgURL =
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D';

  const text = '햄버거 맛있당';
  const nickname = '쿨맛탐험가들';
  const date = '2024-02-24';
  const id = 'ewha1';

  const [isEditable, setIsEditable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState('');
  const [edit_YN, setEdit_YN] = useState(false);
  const [editedText, setEditedText] = useState(text);

  useEffect(() => {
    // 뒤로가기나 경로 이동 시 이전 경로 저장
    if (location.state && location.state.from) {
      setPreviousPath(location.state.from);
    }
  }, [location]);

  const handleChange = () => {
    setIsEditable(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUpdatePost = async (postId: string) => {
    setIsEditable(false);
    setEdit_YN(true);
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
          {(userId === id || previousPath === 'http://localhost:3000/mypage') && (
            <div>
              <Delete onClick={() => setModalOpen(true)}>삭제 /</Delete>
              {modalOpen && <DeleteModal onClose={handleCloseModal} />}
              <Edit onClick={handleChange}>편집</Edit>
            </div>
          )}
          <Content
            value={editedText}
            onChange={e => setEditedText(e.target.value)}
            readOnly={!isEditable}>
            {text}
          </Content>
          {isEditable ? (
            <Submit onClick={() => handleUpdatePost('your-post-id')} />
          ) : (
            <>
              <PostReaction>
                <Emoji>❤️0</Emoji>
                <Emoji>🤤12</Emoji>
                <Emoji>😯8</Emoji>
                <Emoji>👍2</Emoji>
                <Emoji>🔥7</Emoji>
              </PostReaction>
              <NicknameP>{nickname}</NicknameP>
              <Date>{date}</Date>
              <Edit_Y>{edit_YN ? '(수정됨)' : null}</Edit_Y>
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
