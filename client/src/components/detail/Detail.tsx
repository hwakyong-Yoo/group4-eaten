import { useEffect, useState } from 'react';
import { DetailHeater } from './DetailHeader';
import { DetailPost, DetailPage, Footer, Img, Text } from './Detail.style';
import { PostType } from '../post';
import { detail } from '../../api/declaration';

export const Detail = () => {
  const postId: number = 1;
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const postData = await detail(postId);
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    getPostDetails();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const userId = localStorage.getItem('userId');

  const imgURL = 'https://placekitten.com/204/204';
  const text = '맛있어요 어쩌구 저쩌구';
  const nickname = 'user12345';
  const date = '2024-12-10';
  const id = 'ewha1';

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
          {post && userId === id && (
            <div>
              <button>수정</button>
              <button>삭제</button>
            </div>
          )}
          <p>{text}</p>
          <p>{nickname}</p>
          <p>{date}</p>
        </Text>
      </DetailPost>
      <div>
        <Footer />
      </div>
    </DetailPage>
  );
};
