import React from 'react';
import '../styles/Carousel.css';

const Carousel = ({
  items,
  reverse = false,
  width = '50vw',
  spacing = '10px',
  scrollSpeed = '10s',
  slideSize = '200px'
}) => {
  const slideWidth = `calc(((${width}) - (${spacing} * ${items.length})) / ${items.length})`;

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div
      className="carousel-wrapper"
      style={{
        '--carousel-width': width,
        '--carousel-spacing': spacing,
        '--carousel-scroll-speed': scrollSpeed,
        '--carousel-item-count': items.length,
        '--carousel-slide-width': slideWidth,
        '--carousel-slide-size': slideSize
      }}
    >
      <div className={`carousel-track ${reverse ? 'reverse' : ''}`}>
        {duplicatedItems.map((item, idx) => (
          <div className="carousel-slide" key={idx}>
            {/* Each item box: background image that covers the box */}
            <div className="carousel-box">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="fill-link"
                style={{
                  backgroundImage: `url(${item.image})`
                }}
              >
                {/* No <img> needed; background covers the box */}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
