// TODO: 새 포스트 작성 시 서버에 add
import axios, { AxiosError } from 'axios'; // AxiosError를 import합니다.
import { API } from '../api.const';
axios.defaults.withCredentials = true;

// 새 게시물 작성하는 함수
export const addPost = async (
  userId: string,
  content: string,
  imagePath: File,
): Promise<{ success: boolean; postId?: number; error?: string }> => {
  try {
    axios.defaults.withCredentials = true;
    // 현재 날짜를 ISO 포맷으로 가져옴
    const date = new Date().toISOString();
    // FormData를 생성하여 파일 데이터를 추가
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('content', content);
    formData.append('date', date);
    formData.append('imagePath', imagePath);
    // 서버로 요청을 보내서 새 게시물을 생성하고 그 결과를 받아옴
    const response = await axios.post(`/posts`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data', // 파일 업로드 시에는 Content-Type을 multipart/form-data로 설정해야 합니다.
      },
    });
    // 생성된 게시물 정보를 반환함
    return { success: true, postId: response.data.postId };
  } catch (error) {
    // AxiosError로 오류 처리
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError; // 타입 단언을 사용하여 AxiosError로 변환합니다.
      if (axiosError.response && axiosError.response.status === 400) {
        // 잘못된 요청인 경우
        console.error('잘못된 요청입니다.');
      } else {
        // 기타 오류 발생 시
        console.error('게시물을 생성하는 데 실패했습니다.', axiosError);
      }
    } else {
      // 기타 오류 발생 시
      console.error('게시물을 생성하는 데 실패했습니다.', error);
    }
    return { success: false, error: '게시물을 생성하는 데 실패했습니다.' };
  }
};
