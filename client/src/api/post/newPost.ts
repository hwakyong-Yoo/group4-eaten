// TODO: 최신 게시물을 서버에서 받아옴. 페이징 시 16개 로딩 /posts
import { API } from '../api.const';
import { PostType } from '../../components/post';

export async function fetchNewPosts(): Promise<PostType[]> {
  try {
    const response = await fetch(`https://${API}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch initial posts');
    }
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error('Error fetching initial posts:', error);
    return [];
  }
}

export async function fetchNextPage(page: number): Promise<PostType[]> {
  try {
    const response = await fetch(`https://${API}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch next page');
    }
    const data = await response.json();
    return data.posts; // 서버에서 게시물 목록을 posts 키로 받아온다고 가정합니다.
  } catch (error) {
    console.error('Error fetching next page:', error);
    return [];
  }
}
