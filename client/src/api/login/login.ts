// TODO: 로그인 하고 아이디와 비밀번호 일치 여부 체크 /user/login
import { API } from '../api.const';

interface LoginResponse {
  msg: string;
  statusCode: number;
  userId?: string;
  nickname?: string;
}

const loginUser = async (
  userId: string,
  password: string,
): Promise<{ success: boolean; nickname?: string; error?: string }> => {
  try {
    // 서버에 로그인 요청을 보내고, 사용자 정보를 받아옴
    const response = await fetch(`${API}/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, password }),
    });

    const data: LoginResponse = await response.json();

    if (response.ok && data.statusCode === 200) {
      // 로그인 성공 시 사용자 정보와 함께 반환
      return { success: true, nickname: data.nickname };
    } else {
      // 로그인 실패 시 에러 메시지 반환
      return { success: false, error: data.msg };
    }
  } catch (error) {
    // 네트워크 오류 등의 예외 처리
    //console.error('로그인 과정에서 오류가 발생했습니다:', error);
    console.log('로그인 과정에서 서버 오류 발생');
    return { success: false, error: '로그인 과정에서 오류가 발생했습니다.' };
  }
};

export default loginUser;
