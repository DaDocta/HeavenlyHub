import React, { useEffect, useState } from 'react';
import fetchData from '../utils/fetchData';
import Carousel from '../components/Carousel';
import '../styles/Home.css';

const baseApiUrl = 'https://heavenlyhub-333358093861.us-central1.run.app';

const Home = () => {
  const [data, setData] = useState({});
  const categories = ['books', 'artists', 'celebrities', 'ministries', 'podcasts'];

  const [carouselSettings, setCarouselSettings] = useState({
    width: '50vw',
    slideSize: '200px',
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCarouselSettings({ width: '80vw', slideSize: '100px' });
      } else {
        setCarouselSettings({ width: '45vw', slideSize: '200px' });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

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
                reverse={index % 2 !== 0}
                width={carouselSettings.width}
                slideSize={carouselSettings.slideSize} /* 🔹 Now dynamically adjusts */
                spacing="10px"
                scrollSpeed="10s"
              />
            </div>
          ) : null
        )}
      </main>
    </div>
  );
};

export default Home;
