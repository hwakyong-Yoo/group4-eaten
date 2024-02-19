
import { Link } from 'react-router-dom';
import { Posts, PostImage, PostContent, PostReaction, Emoji} from './styles';

export type PostType = {
  id: number;
  imageURL: string;
  text: string;
  nickname?: string;
  date?: string;
  userId?: string;
  edit_YN?: boolean;

  heart?: number;
  hungry?: number;
  wow?: number;
  good?: number;
  fire?: number;
};

export const defaultPost: PostType = {
  id: 0,
  imageURL: '',
  text: 'Default Text', // text가 없는 경우에는 'Default Text'로 설정
  nickname: '익명',
  date: '2024-02-11',
  heart: 0,
};

export const Post = ({ post }: { post: PostType }) => {
  return (
    <Posts key={post.id}>
      <Link to={`/post/${post.id}`}>
          <PostImage src={post.imageURL} />
        <PostContent>
          <p>{post.text}</p>
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
