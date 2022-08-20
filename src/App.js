import './App.module.css';
import Login from './component/Login';
import { Route, Routes, useLocation } from "react-router-dom";
import EmptyPage from './component/EmptyPage';
import Header from './component/HeaderComponents/Header';
import MainTemplate from './component/mainComponents/MainTemplate';
import ReservationState from './component/ReservationStateComponents/ReservationState'

function App() {
  let location = useLocation();
  return (
    <div>
      {location.pathname !== '/login' ? <Header /> : null}
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/' element={<MainTemplate />} />
        <Route path='main/:id' element={<MainTemplate />} />
        <Route path="/state" element={<ReservationState />} />
        <Route path='*' element={<EmptyPage />} />
      </Routes>

    </div>
  );
}

export default App;
