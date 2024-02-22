// TODO: 자신의 아이디와 일치하는 포스트 목록 받아오기 /mypage
import axios, { AxiosError } from 'axios'; // AxiosError를 import합니다.
import { PostType } from '../../components/post';
import { API } from '../api.const';
axios.defaults.withCredentials = true;

// 마이페이지에서 유저가 작성한 게시물 목록을 가져오는 함수
export const getMyPosts = async (userId: string): Promise<PostType[]> => {
  try {
    // 서버로 요청을 보내 유저가 작성한 게시물 목록을 가져옴
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${API}/mypage/${userId}`, {
      withCredentials: true,
    });
    // 가져온 게시물 목록 반환
    return response.data.posts;
  } catch (error) {
    // AxiosError로 오류 처리
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError; // 타입 단언을 사용하여 AxiosError로 변환합니다.
      if (axiosError.response && axiosError.response.status === 400) {
        // 존재하지 않는 사용자인 경우
        console.error('존재하지 않는 사용자입니다.');
      } else {
        // 기타 오류 발생 시
        console.error('유저 게시물을 불러오는 데 실패했습니다.', axiosError);
      }
    } else {
      // 기타 오류 발생 시
      console.error('유저 게시물을 불러오는 데 실패했습니다.', error);
    }
    return [];
  }
};
