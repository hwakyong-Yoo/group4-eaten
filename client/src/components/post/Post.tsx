import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Posts, PostImage, PostContent, PostReaction, Emoji } from './Post.style';
import { API } from '../../api/api.const';

export type PostType = {
  postId?: number;
  nickname?: string;
  content?: string;
  date?: string;
  imagepath?: string;
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
  hungry: 0,
};

export const Post = ({ post }: { post: PostType }) => {
  // const imagepath = post.imagepath;
  // const relativePath = imagepath.replace(/\\/g, '/');
  // const imageUrl = { API } + '/' + relativePath;
  const [selectedReaction, setSelectedReaction] = useState<keyof PostType | null>(null);
  const [reactions, setReactions] = useState<PostType>({
    heart: post.heart || 0,
    hungry: post.hungry || 0,
    wow: post.wow || 0,
    good: post.good || 0,
    fire: post.fire || 0,
  });

  const LoggedIn = localStorage.getItem('login');
  const IsLoggedIn = LoggedIn === 'true';

  const handleReaction = (reaction: keyof PostType) => {
    if (!IsLoggedIn) {
      alert('로그인 후 이용 가능합니다');
      return;
    }
    if (selectedReaction === reaction) {
      setSelectedReaction(null);
      setReactions(prevReactions => ({
        ...prevReactions,
        [reaction]: ((prevReactions[reaction] as number) || 0) - 1,
      }));
    } else {
      if (selectedReaction) {
        setReactions(prevReactions => ({
          ...prevReactions,
          [selectedReaction]: ((prevReactions[selectedReaction] as number) || 0) - 1,
        }));
      }
      setSelectedReaction(reaction);
      setReactions(prevReactions => ({
        ...prevReactions,
        [reaction]: ((prevReactions[reaction] as number) || 0) + 1,
      }));
    }
  };

  return (
    <Posts key={post.postId}>
      <Link to={`/post/${post.postId}`}>
        <PostImage src={post.imagepath} />
      </Link>
      <PostContent>
        <p>{post.content}</p>
      </PostContent>
      <PostReaction>
        <Emoji onClick={() => handleReaction('heart')}>❤️{reactions.heart}</Emoji>
        <Emoji onClick={() => handleReaction('hungry')}>🤤{reactions.hungry}</Emoji>
        <Emoji onClick={() => handleReaction('wow')}>😲{reactions.wow}</Emoji>
        <Emoji onClick={() => handleReaction('good')}>👍{reactions.good}</Emoji>
        <Emoji onClick={() => handleReaction('fire')}>🔥{reactions.fire}</Emoji>
      </PostReaction>
    </Posts>
  );
};
