import React from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";


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
        console.log("Decoded email:", decoded.email);
        console.log("ADMIN:", ADMIN);
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
            <nav className="navCointainer">
                <div className="Store-Name">
                    <h1>Artisan Haven</h1>
                </div>
                <div>
                    <Link className="links" to="/category/candles">Candles</Link>
                    <Link className="links" to="/category/handicrafts">Handicrafts</Link>
                    <Link className="links" to="signup">Sign Up</Link>
                    <Link className="links" to="login">Log In</Link>
                </div>
            </nav>
        ) : (
            <nav className="navContainer">
                <div className="Store-Name">
                    <h1>Artisan Haven</h1>
                </div>
                <div>
                    <Link className="links" >{decoded.email}</Link>
                    {token && decoded.email === ADMIN && (
                        <Link className="links" to="/create">
                        Admin Dashboard
                        </Link>
                    )}
                    <Link className="links" to="/category/candles">Candles</Link>
                    <Link className="links" to="/category/handicrafts">Handicrafts</Link>
                    <Link className="links" onClick={handleLogout}>Log out</Link>
                </div>
            </nav>
        )}
        </>
    );
}

export default Navbar;