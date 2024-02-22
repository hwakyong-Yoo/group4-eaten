import { mockPopularPosts, mockRecentPosts } from '../../mock.const';
import { NewPostList } from '../new';
import { PopularPosts } from '../popular';
import { Header } from './Header';
import { PopularPost, NewPost } from './styles';
import fetchHelloData from '../../api/hello';
import { useState, useEffect } from 'react';

export function Main() {
  const [helloData, setHelloData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHelloData();
        setHelloData(data.message);
      } catch (error) {
        console.error('Error fetching hello data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <PopularPost>
        <h2>인기 게시물</h2>
        <PopularPosts posts={mockPopularPosts} />
      </PopularPost>
      <NewPost>
        <h2>최신 게시물</h2>
        <NewPostList posts={mockRecentPosts} />
      </NewPost>
      <div>
        {helloData ? (
          <div>
            <p>Hello: {helloData}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
