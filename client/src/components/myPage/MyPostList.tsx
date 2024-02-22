import { Post, PostType } from '../post';
import { PostList } from './styles';

export type PostsType = PostType[];

const MyPostList = ({ posts }: { posts: PostsType }) => {
  return (
    <PostList>
      {posts?.map(post =>
        post ? (
          <Post key={post.postId} post={post} />
        ) : (
          <div>Error: Post does not exist</div>
        ),
      )}
    </PostList>
  );
};

export default MyPostList;
