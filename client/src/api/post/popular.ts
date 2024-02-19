// TODO: 인시 게시물 9개를 서버에서 받아 옴 /hot-posts

import axios from 'axios';
import { PostType } from '../../components/post';
import { API } from '../api.const';

// 서버로부터 게시물 데이터를 받아오는 함수
export const HotPosts = async (): Promise<PostType[]> => {
  try {
    const response = await axios.get<PostType[]>(`http://${API}/hot-posts`);
    return response.data;
  } catch (error) {
    console.error('게시물을 불러오는 데 실패했습니다:', error);
    return [];
  }
};
