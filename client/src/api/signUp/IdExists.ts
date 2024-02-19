// TODO: id 중복되는지 서버에 요청해서 확인 /userId/exists

import axios from 'axios';
import { API } from '../api.const';

// 유저 아이디의 중복 여부를 확인하는 함수
const IdExists = async (userId: string): Promise<boolean> => {
  try {
    // 서버에 요청을 보냄
    const response = await axios.get(`https://${API}/userId/exists`);

    // 응답 데이터에서 중복 여부를 가져옴
    const { exists } = response.data;

    // 중복 여부를 반환
    return exists;
  } catch (error) {
    console.error('Error checking if user ID exists:', error);
    // 에러가 발생하면 false를 반환하여 중복 여부를 확인할 수 없음을 알림
    return false;
  }
};

export default IdExists;
