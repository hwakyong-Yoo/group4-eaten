import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// TODO: import 깔끔하게 수정
import { Add, AddHeader, Detail, Main } from './components';

import Create from './components/signUp/SignUp';
import Login from './components/login/Login';
import MyPage from './components/myPage/MyPage';
import MyPageHeader from './components/myPage/MyPageHeader';
import './App.css';

interface UserInfo {
  nickname: string;
}

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Main />} />
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
                <AddHeader
                  isLoggedIn={isLoggedIn}
                  userInfo={userInfo}
                  setLoggedIn={setLoggedIn}
                />
                <div>
                  <Add />
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
          <Route path="/post/:postId" Component={Detail} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
