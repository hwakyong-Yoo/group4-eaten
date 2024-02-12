import { mockPopularPosts, mockRecentPosts } from '../../mock.const';
import { NewPostList } from '../new';
import { PopularPosts } from '../popular';
import { Header } from './Header';

export function Main() {
  const setLoggedIn = () => {};

  const userInfo = localStorage.getItem('userInfo');
  console.log(123, userInfo);
  const { nickname = '', isLoggedIn = false } = userInfo ? JSON.parse(userInfo) : {};

  return (
    <>
      <Header isLoggedIn={isLoggedIn} userInfo={nickname} setLoggedIn={setLoggedIn} />
      <div className="popular-posts">
        <h2>인기 게시물</h2>
        <PopularPosts posts={mockPopularPosts} />
      </div>
      <div className="recent-posts">
        <h2>최신 게시물</h2>
        <NewPostList posts={mockRecentPosts} />
      </div>
    </>
  );
}
