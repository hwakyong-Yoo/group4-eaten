import { useEffect, useState } from 'react';

function Client() {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://43.202.63.5/mypage');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.text();
        setData(responseData);
        console.log('Data from server:', responseData); // 콘솔에 데이터 출력
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from server:</h1>
      <p>{data}</p>
    </div>
  );
}

export default Client;
