import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import JobSearchPlatform from './pages/Jobs';
import JobSearchPlatformNew from './pages/job-search-platform';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobSearchPlatform />} />
        <Route path="/jobs" element={<JobSearchPlatform />} />
        <Route path="/job-search-platform" element={<JobSearchPlatformNew />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;