// App.tsx
import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './Header'
import PopularPosts from './PopularPosts'
import PostList, {PostsType} from './PostList'
import Create from './Create'

import Login from './Login'
import MyPage from './MyPage'
import MyPageHeader from './MyPageHeader'
import New from './New'
import NewHeader from './NewHeader'
import './App.css' // 스타일 파일 불러오기

interface UserInfo {
  nickname: string
}

const App: React.FC = () => {
  const mockPopularPosts = [
    {
      id: 1,
      imageURL: 'https://placekitten.com/200/200',
      text: '고양이 대스타 어쩌구',
      heart: 10
    },
    {
      id: 2,
      imageURL: 'https://placekitten.com/201/201',
      text: '고양이 귀여워 어쩌구',
      hungry: 12
    },
    {
      id: 3,
      imageURL: 'https://placekitten.com/202/202',
      text: '고양이가 짱이야 어쩌구',
      fire: 6
    }
  ]

  const mockRecentPosts = [
    {
      id: 4,
      imageURL: 'https://placekitten.com/203/203',
      text: '최신 게시물 1'
    },
    {
      id: 5,
      imageURL: 'https://placekitten.com/204/204',
      text: '최신 게시물 2'
    },
    {
      id: 6,
      imageURL: 'https://placekitten.com/205/205',
      text: '최신 게시물 3'
    },
    {
      id: 7,
      imageURL: 'https://placekitten.com/206/206',
      text: '최신 게시물 4'
    },
    {
      id: 8,
      imageURL: 'https://placekitten.com/203/203',
      text: '최신 게시물 5'
    },
    {
      id: 9,
      imageURL: 'https://placekitten.com/204/204',
      text: '최신 게시물 6'
    },
    {
      id: 10,
      imageURL: 'https://placekitten.com/205/205',
      text: '최신 게시물 7'
    },
    {
      id: 11,
      imageURL: 'https://placekitten.com/206/206',
      text: '최신 게시물 8'
    }
    // ... 더 많은 최신 게시물 데이터
  ]

  const [isLoggedIn, setLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

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
        </Routes>
      </div>
    </Router>
  )
}

export default App
