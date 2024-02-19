import MyPostList from './MyPostList'
import { useState, useEffect } from 'react';
import {MyPosts} from '../../mock.const';
import {MyPageHeader} from './MyPageHeader';
import {H1} from './styles'
import { getMyPosts } from '../../api/myPage/myPost';
import { PostType } from '../post';


export const MyPage = () => {

  const [userPosts, setUserPosts] = useState<PostType[]>([]);
  //const userId = localStorage.getItem('userId')
  const userId = '12345'

  useEffect(() => {
    // 마이페이지에서 유저가 작성한 게시물 목록을 가져옴
    const fetchUserPosts = async () => {
      const posts = await getMyPosts(userId);
      setUserPosts(posts);
    };
    fetchUserPosts();
  }, [userId]);

  return (
    <div>
      <div>
        <MyPageHeader />
      </div>
      <div>
        <H1>My Page</H1>
        <MyPostList posts={MyPosts} />
         {/* <MyPostList posts={userPosts} /> 서버와 연결 시 게시물 받아옴*/}
      </div>
    </div>
  );
};
