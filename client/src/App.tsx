import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// TODO: import 깔끔하게 수정
import { Add, AddHeader, Detail, Main, SignUp, Login} from './components/declaration';
import MyPage from './components/myPage/MyPage';
import MyPageHeader from './components/myPage/MyPageHeader';
import Setting from './components/myPage/setting/Setting';
import Nickname from './components/myPage/setting/Nickname';
import Delete from './components/myPage/setting/Delete';
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
          <Route path="/signup" element={<SignUp/>}/>
          <Route
            path="/login"
            element={
              <Login
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
           <Route
            path="/mypage/setting"
            element={
              <>
                <MyPageHeader
                  isLoggedIn={isLoggedIn}
                  userInfo={userInfo}
                  setLoggedIn={setLoggedIn}
                />
                <Setting />
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
                <Nickname/>
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
                <Delete />
              </>
            }
            ></Route>
          <Route path="/post/:postId" Component={Detail} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
