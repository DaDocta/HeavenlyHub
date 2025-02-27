// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { FaHome, FaInfoCircle, FaHandHoldingHeart } from 'react-icons/fa';

const Navbar = () => {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => setIsPortrait(window.innerHeight > window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">Heavenly Hub</Link>
      </div>
      <div className="navbar-right">
        <ul>
          <li>
            <Link to="/">
              {isPortrait ? <FaHome /> : 'Home'}
            </Link>
          </li>
          <li>
            <a 
              href="https://garrettstrange.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {isPortrait ? <FaInfoCircle /> : 'About'}
            </a>
          </li>
          <li>
            <a 
              href="https://samaritanspurse.org/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {isPortrait ? <FaHandHoldingHeart /> : 'Give'}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
