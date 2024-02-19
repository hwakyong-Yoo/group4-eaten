// TODO: 서버에 해당 아이디, 비밀번호, 닉네임 add로 등록 /user/create

import axios from 'axios';
import { API } from '../api.const';

// 사용자 정보를 AWS 서버에 저장하는 함수
const CreateSignUp = async (
  nickname: string,
  userId: string,
  password: string,
): Promise<void> => {
  try {
    const url = `https://${API}/user/create`;

    // POST 요청을 보낼 데이터
    const data = {
      nickname,
      userId,
      password,
    };

    // POST 요청 보내기
    const response = await axios.post(url, data);

    // 응답 처리
    console.log('User created successfully:', response.data);
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

export default CreateSignUp;
