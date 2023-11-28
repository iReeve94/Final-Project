import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import christmas from '../assets/christmas.jpg'; 
import './homepage.css'; 

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="header-container">
        <div className="Store-Name">
          <Link to="/" className="logo-link">
            <img className="logohome" src={logo} alt="Art by Lena Logo" />
          </Link>
        </div>
        <div className="header-content">
          <h2 className='h2home'>Welcome to Art by Lena!</h2>
          <p className="welcome-message">
            <span role="img" aria-label="palette">🎨</span> Immerse yourself in the enchanting world of handmade artistry,
            where Lena's creativity comes to life. From intricately designed crafts to the warm glow of handcrafted candles,
            every piece at Art by Lena is a unique expression of imagination. Explore the magic and discover the joy of handmade beauty.
          </p>
        </div>
      </header>

      <section className="banner-section">
        <Link to="/category/christmas" className="banner-link">
          <img src={christmas} alt="Christmas Banner" className="banner-image" />
        </Link>
        <div className="banner-content">
          <h1 className="main-title">Discover the Magic of Christmas</h1>
          <p className="sub-message">Don't miss out on our brand new Christmas collection!</p>
          <Link to="/category/christmas" className="explore-link">Explore More Christmas Handicrafts</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;