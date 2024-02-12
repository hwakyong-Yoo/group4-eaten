// App.tsx
import {useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './Header'
import PopularPosts from '../post/PopularPosts'
import PostList from '../post/PostList'
import Create from '../create_page/Create'
import PostPage from '../post/PostPage'
import Login from '../login_page/Login'
import MyPage from '../my_page/MyPage'
import MyPageHeader from '../my_page/MyPageHeader'
import PageFooter from '../post/PageFooter'
import New from '../newPost_page/New'
import NewHeader from '../newPost_page/NewHeader'
import SettingPage from '../my_page/SettingPage/SettingPage'
import NicknamePage from '../my_page/SettingPage/NicknamePage'
import DeletePage from '../my_page/SettingPage/DeletePage'
import '../App.css' // 스타일 파일 불러오기

interface UserInfo {
  nickname: string
}

const App: React.FC = () => {
  const mockPopularPosts = [
    {
      id: 1,
      imageURL: 'https://placekitten.com/200/200',
      text: '고양이 대스타 어쩌구',
      nickname: 'eee',
      date: '2024-5-5',
      heart: 10,
      hungry: 5,
      wow: 8,
      good: 2,
      fire: 7,
    },
    {
      id: 2,
      imageURL: 'https://placekitten.com/201/201',
      text: '고양이 귀여워 어쩌구',
      nickname: 'eee',
      hungry: 12,
    },
    {
      id: 3,
      imageURL: 'https://placekitten.com/202/202',
      text: '고양이가 짱이야 어쩌구',
      nickname: 'eee',
      fire: 6,
    },
    {
      id: 4,
      imageURL: 'https://placekitten.com/201/201',
      text: '고양이 대스타 어쩌구',
      nickname: 'eee',
      date: '2024-5-5',
      heart: 1,
      hungry: 5,
      wow: 5,
      good: 2,
      fire: 7,
    },
    {
      id: 5,
      imageURL: 'https://placekitten.com/202/202',
      text: '고양이 귀여워 어쩌구',
      nickname: 'eee',
      hungry: 12,
    },
    {
      id: 6,
      imageURL: 'https://placekitten.com/205/205',
      text: '고양이가 짱이야 어쩌구',
      nickname: 'eee',
      fire: 6,
    },
    {
      id: 7,
      imageURL: 'https://placekitten.com/207/207',
      text: '고양이 대스타 어쩌구',
      nickname: 'eee',
      date: '2024-5-5',
      heart: 10,
      hungry: 5,
      wow: 8,
      good: 2,
      fire: 7,
    },
    {
      id: 8,
      imageURL: 'https://placekitten.com/201/201',
      text: '고양이 귀여워 어쩌구',
      nickname: 'eee',
      hungry: 12,
    },
    {
      id: 9,
      imageURL: 'https://placekitten.com/202/202',
      text: '고양이가 짱이야 어쩌구',
      nickname: 'eee',
      fire: 6,
    },
  ]

  const mockRecentPosts = [
    {
      id: 34,
      imageURL: 'https://placekitten.com/203/203',
      text: '최신 게시물 1',
      nickname: 'eee',
      heart: 10,
    },
    {
      id: 35,
      imageURL: 'https://placekitten.com/204/204',
      text: '최신 게시물 2',
      nickname: 'eee',
      heart: 10,
    },
    {
      id: 36,
      imageURL: 'https://placekitten.com/205/205',
      text: '최신 게시물 3',
      nickname: 'eee',
      heart: 10,
    },
    {
      id: 37,
      imageURL: 'https://placekitten.com/206/206',
      text: '최신 게시물 4',
      nickname: 'eee',
      heart: 10,
    },
    {
      id: 38,
      imageURL: 'https://placekitten.com/203/203',
      text: '최신 게시물 5',
      nickname: 'eee',
      heart: 10,
    },
    {
      id: 39,
      imageURL: 'https://placekitten.com/204/204',
      text: '최신 게시물 6',
      nickname: 'eee',
      heart: 10,
    },
    {
      id: 310,
      imageURL: 'https://placekitten.com/205/205',
      text: '최신 게시물 7',
      nickname: 'eee',
      heart: 10,
    },
    {
      id: 311,
      imageURL: 'https://placekitten.com/206/206',
      text: '최신 게시물 8',
      nickname: 'eee',
      heart: 10,
    },
    // ... 더 많은 최신 게시물 데이터
  ]

  const [isLoggedIn, setLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/create"
            element={
              <Create
                isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn}
                setUserInfo={setUserInfo}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn}
                setUserInfo={setUserInfo}
              />
            }
          />
          <Route
            path="/new"
            element={
              <>
                <NewHeader
                  isLoggedIn={isLoggedIn}
                  userInfo={userInfo}
                  setLoggedIn={setLoggedIn}
                />
                <div>
                  <New />
                  <PageFooter />
                </div>
              </>
            }
          />
          <Route
            path="/mypage"
            element={
              <>
                <MyPageHeader
                  isLoggedIn={isLoggedIn}
                  userInfo={userInfo}
                  setLoggedIn={setLoggedIn}
                />
                <div>
                  <MyPage />
                </div>
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header
                  isLoggedIn={isLoggedIn}
                  userInfo={userInfo}
                  setLoggedIn={setLoggedIn}
                />
                <div className="popular-posts">
                  <h2>인기 게시물</h2>
                  <PopularPosts posts={mockPopularPosts} />
                </div>
                <div className="recent-posts">
                  <h2>최신 게시물</h2>
                  <PostList posts={mockRecentPosts} />
                </div>
              </>
            }
          />
          <Route
            path="/mypage/setting"
            element={
              <>
                <MyPageHeader
                  isLoggedIn={isLoggedIn}
                  userInfo={userInfo}
                  setLoggedIn={setLoggedIn}
                />
                <SettingPage />
              </>
            }
          />
          <Route
            path="/mypage/setting/nickname"
            element={
              <>
                <MyPageHeader
                  isLoggedIn={isLoggedIn}
                  userInfo={userInfo}
                  setLoggedIn={setLoggedIn}
                />
                <NicknamePage />
              </>
            }
          />
          <Route
            path="/mypage/setting/delete"
            element={
              <>
                <MyPageHeader
                  isLoggedIn={isLoggedIn}
                  userInfo={userInfo}
                  setLoggedIn={setLoggedIn}
                />
                <DeletePage />
              </>
            }
          />
          <Route path="/post/:postId" Component={PostPage} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
