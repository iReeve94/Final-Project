import './App.css';
import SignUp from './components/signUp';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import AddItem from './Pages/adminDashboard';
import CandlesPage from './Pages/candles';
import HandicraftsPage from './Pages/handicrafts';
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<AddItem />} />
      <Route path="/category/:category" element={<CandlesPage />} />
      <Route path="/category/:category" element={<HandicraftsPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
