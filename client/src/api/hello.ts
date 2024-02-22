import axios from 'axios';
import { API } from './api.const';
axios.defaults.withCredentials = true;
const xhr = new XMLHttpRequest();
xhr.open('GET', `/api/hello`, true);
xhr.withCredentials = true;

// api/hello 엔드포인트로 GET 요청을 보내는 함수
const fetchHelloData = async () => {
  try {
    // GET 요청 보내기
    const response = await axios.get(`/api/hello`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://eaten-ecc.site',
      },
      withCredentials: true,
    });

    //const data: string = await response.json();

    // 응답 데이터 반환
    return response.data.message;
  } catch (error) {
    // 오류 처리
    //console.error('Error fetching data from API:', error);
    console.log('hello 서버 연결 실패');
    throw new Error('Failed to fetch data from API');
  }
};

export default fetchHelloData;
