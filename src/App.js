// src/App.js
import React, { useRef } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import BackgroundVideo from './components/BackgroundVideo';
import NavBar from './components/Navbar';
import Give from './pages/Give';
import Share from './pages/Share';
import { AuthProvider, AuthContext } from './AuthContext';
import './styles/App.css';

function App() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <AuthProvider>
      <div className="page-content" ref={nodeRef}>
        <NavBar />
        <BackgroundVideo />

        <AuthContext.Consumer>
          {({ isAuthenticated }) => (
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/give" element={<Give />} />
              <Route path="/share" element={<Share />} />
              {/* Just an example of other routes if you want them */}
              <Route
                path="/protected"
                element={
                  isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" />
                }
              />
            </Routes>
          )}
        </AuthContext.Consumer>
      </div>
    </AuthProvider>
  );
}

export default App;
