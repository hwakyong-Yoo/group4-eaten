import { PostType } from '../../components/post';
import { API } from '../api.const';

export async function detail(postId: number): Promise<PostType> {
  try {
    const response = await fetch(`${API}/posts/${postId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://eaten-five.vercel.app/',
      },
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('존재하지 않는 게시물입니다.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('게시물을 불러오는 데 실패했습니다:', error);
    throw error;
  }
}
