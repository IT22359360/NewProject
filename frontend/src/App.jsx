import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Report from "./pages/Report/Report"; // Import the Report page
import Navbar from './components/Navbar';
import CreateGroup from './pages/CreateGroup';  


const App = () => {
  return (
    <Router>
      <div className="flex">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />

            <Route path="/create-group" element={<CreateGroup />} />

            <Route path="/report" element={<Report />} /> {/* Add Report page route */}

            {/* Add more routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};


export default App;
