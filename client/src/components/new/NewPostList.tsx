import { PostsType } from '../myPage';
import { Post } from '../post';
import {PostList} from './styles'

interface NewPostListProps {
  posts: PostsType;
}

export const NewPostList = ({ posts }: NewPostListProps) => {
  return (
    <PostList>
      {posts.length === 0 ? (
        <div>게시글이 없습니다.</div>
      ) : (
        posts.map(post => <Post key={post.id} post={post} />)
      )}
    </PostList>
  );
};
