import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DetailHeater } from './DetailHeader';
import { DetailPost, DetailPage, Footer, Img, Text } from './styles';
import { PostType } from '../post';
import { detail } from '../../api/post/detail';

export const Detail = () => {
  const postId: number = 123;
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

  const imgURL = 'https://placekitten.com/204/204';
  const text = '맛있어요 어쩌구 저쩌구';
  const nickname = 'user12345';
  const date = '2024-12-10';

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
