// TODO: id 중복되는지 서버에 요청해서 확인 /userId/exists

import axios from 'axios';
import { API } from '../api.const';
axios.defaults.withCredentials = true;

// 유저 아이디의 중복 여부를 확인하는 함수
const checkUserIdExists = async (
  userId: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    // 서버에 요청을 보냄
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${API}/userId/exists`, { withCredentials: true });

    // 응답 데이터에서 중복 여부를 가져옴
    const { exists } = response.data;

    // 중복 여부에 따라 메시지 설정
    const message = exists ? '이미 사용중인 아이디입니다.' : '사용가능한 아이디입니다.';

    // 결과 반환
    return { success: !exists, message };
  } catch (error) {
    //console.error('Error checking if user ID exists:', error);
    console.log('아이디 중복 체크 서버 연결 실패');
    // 에러가 발생하면 false를 반환하여 중복 여부를 확인할 수 없음을 알림
    return {
      success: false,
      message: '서버 오류로 인해 아이디 중복 여부를 확인할 수 없습니다.',
    };
  }
};

export default checkUserIdExists;
