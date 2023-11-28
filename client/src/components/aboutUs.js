import React from 'react';
import logo from "../assets/logo.png";
import "./aboutUs.css"

const AboutUs = () => {
    console.log('AboutUs component is rendered');
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>Welcome to Art by Lena</h1>
        <p>Meet Lena, the creative spirit behind the magic.</p>
      </div>
      
      <div className="lena-info">
        <img  src={logo} alt="Lena" className="lena-image" />
        <div className="lena-details">
          <h2>Lena - A Creative Force</h2>
          <p>
            With a heart that beats for creativity, Lena's journey is a tapestry woven with threads of imagination and innovation.
            Her love for crafting transcends the ordinary, and her hands bring to life a symphony of colors and textures.
          </p>
        </div>
      </div>

      <div className="company-info">
        <h2>About Art by Lena</h2>
        <p>
          Art by Lena is not just a company; it's a manifestation of Lena's artistic soul.
          Nestled in the enchanting city of Xanthi, our studio is a haven for those who appreciate the beauty of handmade treasures.
          From intricately designed handicrafts to the warm glow of handcrafted candles, each creation at Art by Lena is a unique expression of artistry.
        </p>
      </div>

      <div className="mission-info">
        <h2>Our Mission</h2>
        <p>
          Our mission is to spread the joy of handmade beauty, offering you a glimpse into Lena's world of imagination.
          Whether you're seeking a thoughtful gift or looking to adorn your space with one-of-a-kind creations, Art by Lena welcomes you to explore the magic of handmade art.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;