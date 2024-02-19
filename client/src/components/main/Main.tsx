import { mockPopularPosts, mockRecentPosts } from '../../mock.const';
import { NewPostList } from '../new';
import { PopularPosts } from '../popular';
import { Header } from './Header';

export function Main() {

  const LoggedIn = localStorage.getItem('login')
  const isLoggedIn = LoggedIn === 'true'
  const nickname = localStorage.getItem('nickname')
  return (
    <>
      <Header isLoggedIn={isLoggedIn} userInfo={nickname}/>
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
