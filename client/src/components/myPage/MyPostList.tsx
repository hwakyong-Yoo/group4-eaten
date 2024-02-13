
import { Post, PostType } from '../post';
import './MyPage.css';

export type PostsType = PostType[];

const MyPostList = ({ posts }: { posts: PostsType }) => {
  return (
    <div className="post-list">
      {posts?.map(post =>
        post ? <Post key={post.id} post={post} /> : <div>Error: Post does not exist</div>,
      )}
    </div>
  );
};

export default MyPostList;
