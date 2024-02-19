import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

// '/api/hello' URL에 대한 GET 요청 핸들러
app.get('/api/hello', async (req, res) => {
  try {
    // 외부 API로부터 데이터 받아오기
    const response = await axios.get('http://43.202.63.5/mypage');
    const data = response.data;

    // 받아온 데이터를 클라이언트에 응답으로 보내기
    res.send(data);
  } catch (error) {
    console.error('Error fetching data from external API:', error);
    res.status(500).send('Internal server error');
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
