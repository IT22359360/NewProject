import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            {/* Add more routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};


export default App;
