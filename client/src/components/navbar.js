import React from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../assets/logo.png";
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
  const ADMIN = "admin@gmail.com";
  const navigate = useNavigate();
  let token;
  let decoded;
  try {
    token = localStorage.getItem("token");

    if (token) {
      decoded = jwtDecode(token);
    }
  } catch (error) {
    console.log("Invalid token", error);
  }

  function handleLogout() {
    if (token) {
      localStorage.removeItem("token");
      navigate("/login");
      window.location.reload();
    } else {
      return;
    }
  }

  return (
    <>
      {!token ? (
        <nav className="navContainer">
          <Link to="/" className="logo-link"> 
            <div className="Store-Name">
              <img className="logo" src={logo} alt="Art by Lena Logo" />
            </div>
          </Link>
          <div>
            <Link className="links" to="/category/candles">Candles</Link>
            <Link className="links" to="/category/handicrafts">Handicrafts</Link>
            <Link className="links" to="/category/christmas">Christmas Specials</Link>
            <Link className="links" to="signup">Sign Up</Link>
            <Link className="links" to="login">Log In</Link>
          </div>
        </nav>
      ) : (
        <nav className="navContainer">
          <Link to="/" className="logo-link"> 
            <div className="Store-Name">
              <img className="logo" src={logo} alt="Art by Lena Logo" />
            </div>
          </Link>
          <div>
            {token && decoded.email === ADMIN && (
              <>
                <Link className="links" to="/admin-dashboard">
                  Admin Dashboard
                </Link>
                <Link className="links" to="/orders">
                  Orders
                </Link>
              </>
            )}
            <Link className="links" to="/category/candles">Candles</Link>
            <Link className="links" to="/category/handicrafts">Handicrafts</Link>
            <Link className="links" to="/category/christmas">Christmas Specials</Link>
            {decoded.email !== ADMIN && (
              <Link className="links" to="/cart">
              <ShoppingCartIcon /> 
            </Link>
            )}
            <Link to="#" className="logout" onClick={handleLogout}>
              <IconButton aria-label="logout" color="primary" style={{ color: 'red' }}>
                <LogoutIcon />
              </IconButton>
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;