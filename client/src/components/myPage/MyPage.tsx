import MyPostList from './MyPostList'
import {MyPosts} from '../../mock.const';
import {MyPageHeader} from './MyPageHeader';
import {H1} from './styles'


export const MyPage = () => {
  return (
    <div>
      <div>
        <MyPageHeader />
      </div>
      <div>
        <H1>My Page</H1>
        <MyPostList posts={MyPosts} />
      </div>
    </div>
  );
}
