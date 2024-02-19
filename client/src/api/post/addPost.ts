// TODO: 새 포스트 작성 시 서버에 add

import axios from 'axios';
import { PostType } from '../../components/post';
import { API } from '../api.const';

// 새 게시물 작성하는 함수
export const addPost = async (
  userId: string,
  content: string,
  imagePath: File,
): Promise<PostType> => {
  try {
    // 현재 날짜를 ISO 포맷으로 가져옴
    const date = new Date().toISOString();
    // 서버로 요청을 보내서 새 게시물을 생성하고 그 결과를 받아옴
    const response = await axios.post(`https://${API}/posts`, {
      userId,
      content,
      imagePath,
      date,
    });
    // 생성된 게시물을 반환함
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error; // 에러 처리를 위해 에러를 다시 던짐
  }
};
