import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import JobSearchPlatform from './pages/Jobs';
import JobSearchPlatformNew from './pages/job-search-platform';
import Talents from './pages/Talents';
import About from './pages/About';
import Testimonials from './pages/Testimonials';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobSearchPlatform />} />
        <Route path="/jobs" element={<JobSearchPlatform />} />
        <Route path="/job-search-platform" element={<JobSearchPlatformNew />} />
        <Route path="/talents" element={<Talents />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;