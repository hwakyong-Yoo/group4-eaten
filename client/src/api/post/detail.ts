import internal from 'stream';
import { PostType } from '../../components/post';
import { API } from '../api.const';

export async function detail(postId: number): Promise<PostType> {
  try {
    const response = await fetch(`http://${API}/posts/${postId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    const data = await response.json();
    return data.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}
