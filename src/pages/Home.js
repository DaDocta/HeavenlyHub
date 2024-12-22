import React, { useEffect, useState } from 'react';
import fetchData from '../utils/fetchData';
import '../styles/Home.css';

const baseApiUrl = 'https://heavenlyhub-333358093861.us-central1.run.app';

const Home = () => {
  const [data, setData] = useState({});
  const categories = ['books', 'artists', 'celebrities', 'ministries', 'podcasts'];

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch main.json
        const jsonData = await fetchData(`${baseApiUrl}/getFile?fileName=main.json`);
        setData(jsonData);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };
    loadData();
  }, []);

  const renderCarousel = (items, category) => {
    // Optional: Add next/prev logic or styling
    return (
      <div className="carousel-section">
        <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
        <div className="carousel-container">
          {items?.map((item, index) => (
            <div key={index} className="carousel-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              {item.author && <p>Author: {item.author}</p>}
              {item.host && <p>Host: {item.host}</p>}
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="home">
      <header>
        <h1>Heavenly Hub</h1>
        <p>Discover resources across multiple faith-based categories.</p>
      </header>

      <main>
        {categories.map((category) =>
          data[category] ? renderCarousel(data[category], category) : null
        )}
      </main>
    </div>
  );
};

export default Home;
