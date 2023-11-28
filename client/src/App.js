import './App.css';
import SignUp from './components/signUp';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import AddItem from './components/createItem';
import HomePage from './Pages/homepage';
import CandlesPage from './Pages/candles';
import HandicraftsPage from './Pages/handicrafts';
import ChristmasPage from './Pages/christmas';
import AdminDashboard from './Pages/adminDashboard';
import Cart from './components/cart';
import Footer from './components/footer';
import AboutUs from './components/aboutUs';
import OrdersPage from './Pages/orderspage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/category/:category" element={<CandlesPage />} />
        <Route path="/category/:category" element={<HandicraftsPage />} />
        <Route path="/category/:category" element={<ChristmasPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
        <Route path='/orders' element={<OrdersPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;