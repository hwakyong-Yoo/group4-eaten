import { useEffect, useState } from 'react';
import { getMyPosts } from '../../api/myPage/myPost';
import { MyPosts } from '../../mock.const';
import { PostType } from '../post';
import { H1 } from './MyPage.style';
import { MyPageHeader } from './MyPageHeader';
import MyPostList from './MyPostList';

export const MyPage = () => {
  const [myPosts, setMyPosts] = useState<PostType[]>([]);
  //const userId = localStorage.getItem('userId')
  const userId = 'ewha1';

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const posts = await getMyPosts(userId);
        setMyPosts(posts);
      } catch (error) {
        console.error('Error fetching my posts:', error);
      }
    };

    fetchMyPosts();
  }, [userId]);

  return (
    <div>
      <div>
        <MyPageHeader />
      </div>
      <div>
        <H1>My Page</H1>
        <MyPostList posts={MyPosts} />
        <MyPostList posts={myPosts} />
      </div>
    </div>
  );
};
