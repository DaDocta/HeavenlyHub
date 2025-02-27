import React, { useEffect, useRef, useState } from 'react';
import '../styles/Carousel.css';

const Carousel = ({
  items,
  reverse = false,
  width = '45vw', // Works for both fixed (e.g. "500px") and dynamic (e.g. "80vw")
  spacing = '10px',
  scrollSpeed = '10s',
  slideSize = '200px',
}) => {
  const carouselRef = useRef(null);
  const [loopDistance, setLoopDistance] = useState('0px');

  useEffect(() => {
    if (carouselRef.current) {
      const totalWidth = carouselRef.current.scrollWidth / 3; // Get width of one full set
      setLoopDistance(`-${totalWidth}px`); // Ensure accurate looping
    }
  }, [items]);

  // Triple duplication to prevent jump issues
  const tripledItems = [...items, ...items, ...items];

  return (
    <div
      className="carousel-wrapper"
      style={{
        '--carousel-width': width,
        '--carousel-spacing': spacing,
        '--carousel-scroll-speed': scrollSpeed,
        '--carousel-slide-size': slideSize,
        '--loop-distance': loopDistance, // Dynamically calculated
      }}
    >
      <div ref={carouselRef} className={`carousel-track ${reverse ? 'reverse' : ''}`}>
        {tripledItems.map((item, idx) => (
          <div className="carousel-slide" key={idx}>
            <div className="carousel-box">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img src={item.image} alt={item.name} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
