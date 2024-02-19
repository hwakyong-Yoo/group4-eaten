import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Add, Detail, Main, SignUp, Login, MyPage, Setting, Nickname, Delete} from './components/declaration';
import './App.css';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/> }/>
          <Route path="/new" element={<Add />}/>
          <Route path="/mypage" element={<MyPage />}/>
           <Route path="/mypage/setting" element={<Setting />}/>
            <Route path="/mypage/setting/nickname" element={ <Nickname/>}/>
            <Route path="/mypage/setting/delete" element={ <Delete />} />
          <Route path="/post/:postId" element={<Detail/>}/>
        </Routes>
    </Router>
  );
};

export default App;
