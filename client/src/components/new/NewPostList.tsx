import { PostType } from '../post';
import { Post } from '../post';
import { PostList } from './New.style';
import { useEffect, useState } from 'react';
import { fetchNextPage } from '../../api/declaration';

interface NewPostListProps {
  posts: PostType[]; // props 형식 수정
}

export const NewPostList = ({ posts: initialPosts }: NewPostListProps) => {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // 최초 렌더링 시 초기 게시물을 가져옴
    fetchPosts(page);
  }, []);

  const fetchPosts = (pageNum: number) => {
    fetchNextPage(pageNum).then(nextPosts => {
      setPosts(prevPosts => [...prevPosts, ...nextPosts]);
      setPage(pageNum + 1);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 20) {
        // 스크롤이 맨 아래에 도달하면
        fetchPosts(page);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]); // 페이지 변경 시마다 이벤트 리스너를 업데이트

  return (
    <PostList>
      {posts && posts.length > 0 ? (
        posts.map(post => <Post key={post.postId} post={post} />)
      ) : (
        <div>게시글이 없습니다.</div>
      )}
    </PostList>
  );
};
