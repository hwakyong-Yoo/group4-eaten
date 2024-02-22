// TODO: 서버에 해당 아이디, 비밀번호, 닉네임 add로 등록 /user/create

import axios from 'axios';
import { API } from '../api.const';
axios.defaults.withCredentials = true;

// 사용자 정보를 AWS 서버에 저장하는 함수
const CreateSignUp = async (
  nickname: string,
  userId: string,
  password: string,
): Promise<{ msg: string; statusCode: number }> => {
  try {
    axios.defaults.withCredentials = true;

    // POST 요청을 보낼 데이터
    const data = {
      nickname,
      userId,
      password,
    };

    // POST 요청 보내기
    const response = await axios.post(`/user/create`, data, {
      withCredentials: true,
    });

    // 응답 처리
    console.log('User created successfully:', response.data);
    return { msg: '회원가입이 완료되었습니다', statusCode: 200 };
  } catch (error) {
    //console.error('Error creating user:', error);
    console.log('회원가입 서버 연결 실패');
    return { msg: '회원가입 중 오류가 발생했습니다.', statusCode: 500 };
  }
};

export default CreateSignUp;
