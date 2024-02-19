// TODO: 자신의 아이디와 일치하는 포스트 목록 받아오기 /mypage

import axios from 'axios';
import { PostType } from '../../components/post';
import { API } from '../api.const';

// 마이페이지에서 유저가 작성한 게시물 목록을 가져오는 함수
export const getMyPosts = async (userId: string): Promise<PostType[]> => {
  try {
    // 서버로 요청을 보내 유저가 작성한 게시물 목록을 가져옴
    const response = await axios.get(`https://${API}/mypage/${userId}`);
    // 가져온 게시물 목록 반환
    return response.data.posts;
  } catch (error) {
    console.error('유저 게시물을 불러오는 데 실패했습니다.', error);
    return [];
  }
};
