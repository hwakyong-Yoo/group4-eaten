import { mockPopularPosts, mockRecentPosts } from '../../mock.const';
import { NewPostList } from '../new';
import { PopularPosts } from '../popular';
import { Header } from './Header';
import { PopularPost, NewPost } from './Main.style';

export function Main() {
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
    </>
  );
}
