import { Link } from 'react-router-dom';
import { Posts, PostImage, PostContent, PostReaction, Emoji } from './styles';

export type PostType = {
  postId: number;
  nickname?: string;
  content: string;
  date?: string;
  imagepath: string;
  userId?: string;
  edit_YN?: boolean;

  heart?: number;
  hungry?: number;
  wow?: number;
  good?: number;
  fire?: number;
};

export const defaultPost: PostType = {
  postId: 0,
  imagepath: '',
  content: 'Default Text', // text가 없는 경우에는 'Default Text'로 설정
  nickname: '익명',
  date: '2024-02-11',
  heart: 0,
};

export const Post = ({ post }: { post: PostType }) => {
  return (
    <Posts key={post.postId}>
      <Link to={`/post/${post.postId}`}>
        <PostImage src={post.imagepath} />
        <PostContent>
          <p>{post.content}</p>
        </PostContent>
        <PostReaction>
          <Emoji>❤️{post.heart}</Emoji>
          <Emoji>🤤{post.hungry}</Emoji>
          <Emoji>😲{post.wow}</Emoji>
          <Emoji>👍{post.good}</Emoji>
          <Emoji>🔥{post.fire}</Emoji>
        </PostReaction>
      </Link>
    </Posts>
  );
};
