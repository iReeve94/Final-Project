import React from 'react';
import { useEffect } from 'react';
import footer from './footer.css';


const Footer = () => {
    useEffect(() => {
      const handleScroll = () => {
        const footer = document.querySelector('.footer');
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.clientHeight;
        const scrollTop = window.scrollY;
  
        if (windowHeight + scrollTop >= bodyHeight) {
          footer.classList.add('footer-sticky');
        } else {
          footer.classList.remove('footer-sticky');
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h3>Contact</h3>
          <p>Address: [Zaimi, 15 Xanthi]</p>
          <p>Phone: [Your Phone]</p>
          <p>Email: [trikos.dimitrios@gmail.com]</p>
        </div>
        <div className="footer-column">
          <h3>Links</h3>
          <ul>
            <li><a href="/terms">Terms and Conditions</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Location</h3>
          {/* Embed Google Maps */}
          <div className="map-container">
          <div style={{ width: '100%' }}>
      <iframe
        title="Google Map"
        width="50%"
        height="120"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src="https://maps.google.com/maps?width=100%&amp;height=300&amp;hl=en&amp;q=Zaimi%2015,%20Xanthi,%20Greece+(CandleShop)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      >
        <a href="https://www.maps.ie/population/">Population Estimator map</a>
      </iframe>
    </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Â© {new Date().getFullYear()} Art by Lena. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;