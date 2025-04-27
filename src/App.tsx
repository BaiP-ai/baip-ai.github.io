import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './styles.css';

function App() {
  return (
    <div className="App bg-gradient-to-b from-sky-50 to-sky-100 min-h-screen text-sky-800">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
