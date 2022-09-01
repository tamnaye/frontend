import './App.module.css';
import Login from './component/login/Login';
import { Route, Routes, useLocation } from 'react-router-dom';
import EmptyPage from './component/EmptyPage';
import Header from './component/header/Header';
import MainTemplate from './component/main/MainTemplate';
import ReservationState from './component/reservation/ReservationState';
import BookPage from './component/bookpage/BookPage';
import MyPage from './component/mypage/MyPage';
import TimeTableTest from './test/TimeTableTest';
import Logout from './component/logout/Logout';

function App() {
  let location = useLocation();
  return (
    <div>
      {location.pathname !== '/login' ? <Header /> : null}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/' element={<MainTemplate />} />
        <Route path='/state' element={<ReservationState />} />
        <Route path='/booking/:roomId' element={<BookPage />} />
        <Route path='/mypage/:id' element={<MyPage />} />
        <Route path='*' element={<EmptyPage />} />
      </Routes>
    </div>
  );
}

export default App;
