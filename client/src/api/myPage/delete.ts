// TODO: 회원 탈퇴 시 delete 서버에 전송 /user/{userId}/delete

import axios from 'axios';
import { API } from '../api.const';
axios.defaults.withCredentials = true;

// 회원 탈퇴 함수
export const deleteUser = async (
  userId: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    axios.defaults.withCredentials = true;
    // 서버로 요청을 보내 회원 탈퇴를 시도
    await axios.delete(`${API}/user/${userId}/delete`, { withCredentials: true });
    // 회원 탈퇴 성공 시
    return { success: true };
  } catch (error) {
    // 회원 탈퇴 실패 시
    return {
      success: false,
    };
  }
};
