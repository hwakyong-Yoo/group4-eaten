import MyPostList from './MyPostList'
import {MyPosts} from '../../mock.const';
import {H1} from './styles'


const MyPage = () => {
  return (
    <div>
      <H1>My Page</H1>
      <MyPostList posts={MyPosts} />
    </div>
  )
}

export default MyPage
