import React, { useEffect, useState } from 'react';
import fetchData from '../utils/fetchData';
import Carousel from '../components/Carousel';
import '../styles/Home.css';

const baseApiUrl = 'https://heavenlyhub-333358093861.us-central1.run.app';

const Home = () => {
  const [data, setData] = useState({});
  const categories = ['books', 'artists', 'celebrities', 'ministries', 'podcasts'];

  // 1) Store a "carouselWidth" state that changes by screen size
  const [carouselWidth, setCarouselWidth] = useState(
    window.matchMedia('(max-width: 768px)').matches ? '80vw' : '50vw'
  );

  useEffect(() => {
    // Listen for screen size/orientation changes to update the width
    const handleResize = () => {
      if (window.matchMedia('(max-width: 768px)').matches) {
        setCarouselWidth('80vw');  // Portrait
      } else {
        setCarouselWidth('50vw');  // Landscape
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // 2) Fetch data
  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonData = await fetchData(`${baseApiUrl}/getFile?fileName=main.json`);
        setData(jsonData);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };
    loadData();
  }, []);

  // 3) Render your categories + Carousel
  return (
    <div className="home">
      <header className="star-header">
        <p className="title">Find God Anywhere!</p>
      </header>

      <main>
        {categories.map((cat, index) =>
          data[cat] ? (
            <div key={cat} className="category-section">
              <h2 className="category-title">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </h2>
              <Carousel
                items={data[cat]}
                reverse={index % 2 !== 0} // Alternate direction
                width={carouselWidth}     // <-- pass the dynamic width here
              />
            </div>
          ) : null
        )}
      </main>
    </div>
  );
};

export default Home;
