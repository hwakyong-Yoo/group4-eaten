// TODO: 변경한 닉네임을 서버에 전송 /user/{userId}/edit
import { API } from '../api.const';

const changeNickname = async (
  userId: string,
  newNickname: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    // AWS 서버에 사용자의 닉네임을 수정하는 요청을 보냄
    const response = await fetch(`/user/${userId}/edit`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname: newNickname }),
    });
    const data = await response.json();
    if (response.ok) {
      // 닉네임 수정 성공 시
      return { success: true };
    } else {
      // 닉네임 수정 실패 시 에러 메시지 반환
      return { success: false, error: data.msg };
    }
  } catch (error) {
    // 네트워크 오류 등의 예외 처리
    console.error('닉네임 수정 과정에서 오류가 발생했습니다:', error);
    return { success: false, error: '닉네임 수정 과정에서 오류가 발생했습니다.' };
  }
};

export default changeNickname;
