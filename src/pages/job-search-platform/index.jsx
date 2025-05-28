
// /home/ubuntu/app/pichika_s_application/src/pages/job-search-platform/index.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputField from '../../components/ui/InputField';
import Dropdown from '../../components/ui/Dropdown';
import Slider from '../../components/ui/Slider';
import Button from '../../components/ui/Button';
import Card from '../../components/common/Card';

const JobSearchPlatform = () => {
  // State for search filters
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [salaryRange, setSalaryRange] = useState([50, 80]); // Range in thousands (50k to 80k)
  
  // States for expandable filter sections
  const [expandedFilters, setExpandedFilters] = useState({
    location: true,
    jobType: true,
    experience: true,
    salary: true
  });

  // Function to toggle filter sections
  const toggleFilter = (filterName) => {
    setExpandedFilters({
      ...expandedFilters,
      [filterName]: !expandedFilters[filterName]
    });
  };

  // Function to reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setLocation('');
    setJobType('');
    setExperienceLevel('');
    setSalaryRange([50, 80]);
  };

  // Mock job data
  const jobsData = [
    {
      id: 1,
      company: 'Amazon',
      logo: '/images/img_image_77.png',
      position: 'Full Stack Developer',
      experience: '1-3 yr Exp',
      locationType: 'Onsite',
      salary: '12LPA',
      postedTime: '24h Ago',
      description: 'A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized'
    },
    {
      id: 2,
      company: 'Tesla',
      logo: '/images/img_image_79.png',
      position: 'Node Js Developer',
      experience: '1-3 yr Exp',
      locationType: 'Onsite',
      salary: '12LPA',
      postedTime: '24h Ago',
      description: 'A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized'
    },
    {
      id: 3,
      company: 'Swiggy',
      logo: '/images/img_image_78.png',
      position: 'UX/UI Designer',
      experience: '1-3 yr Exp',
      locationType: 'Onsite',
      salary: '12LPA',
      postedTime: '24h Ago',
      description: 'A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized'
    },
    {
      id: 4,
      company: 'Amazon',
      logo: '/images/img_image_77.png',
      position: 'Full Stack Developer',
      experience: '1-3 yr Exp',
      locationType: 'Onsite',
      salary: '12LPA',
      postedTime: '24h Ago',
      description: 'A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized'
    }
  ];

  // Filter job data based on filters
  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = searchQuery === '' || 
      job.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = location === '' || 
      job.locationType.toLowerCase().includes(location.toLowerCase());
    
    const matchesJobType = jobType === '' || 
      job.position.toLowerCase().includes(jobType.toLowerCase());
    
    // For experience level, we would need a proper experience level field
    // This is a simplified check
    const matchesExperience = experienceLevel === '' || 
      job.experience.toLowerCase().includes(experienceLevel.toLowerCase());
    
    // For salary, we would need to parse the salary string
    // This is a simplified version
    return matchesSearch && matchesLocation && matchesJobType && matchesExperience;
  });

  // Location options
  const locationOptions = [
    { value: 'remote', label: 'Remote' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'canada', label: 'Canada' }
  ];

  // Job Type options
  const jobTypeOptions = [
    { value: 'fulltime', label: 'Full Time' },
    { value: 'parttime', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'remote', label: 'Remote' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' }
  ];

  // Experience Level options
  const experienceOptions = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'junior', label: 'Junior (1-3 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior (5+ years)' },
    { value: 'lead', label: 'Lead/Manager' }
  ];

  // Format salary
  const formatSalary = (value) => {
    return `₹${value}k`;
  };

  const handleApply = (jobId) => {
    console.log(`Applying for job with ID: ${jobId}`);
    toast.success(`Application submitted for job ID: ${jobId}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#fbfbff]">
      {/* Header Navigation - Redesigned */}
      <header className="bg-gradient-to-b from-accent-color to-accent-dark shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Primary Navigation */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center">
                <img src="/images/img_clip_path_group.png" alt="JobHub" className="w-10 h-10" />
                <span className="ml-2 text-[20px] font-bold text-white">JobHub</span>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="/jobs" className="text-[16px] font-semibold text-white hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" aria-current="page"
                  tabIndex="0">
                  Jobs
                </Link>
                <div className="relative group">
                  <button className="text-[16px] font-semibold text-white hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 flex items-center"
                    tabIndex="0">
                    Companies
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link to="/companies/top" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Top Companies
                    </Link>
                    <Link to="/companies/browse" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Browse By Industry
                    </Link>
                    <Link to="/companies/reviews" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Company Reviews
                    </Link>
                  </div>
                </div>
                <div className="relative group">
                  <button className="text-[16px] font-semibold text-white hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 flex items-center"
                    tabIndex="0">
                    Resources
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link to="/resources/career-advice" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Career Advice
                    </Link>
                    <Link to="/resources/resume-tips" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Resume Tips
                    </Link>
                    <Link to="/resources/interview-prep" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Interview Prep
                    </Link>
                  </div>
                </div>
                <Link to="/about" className="text-[16px] font-semibold text-white hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  tabIndex="0">
                  About
                </Link>
              </nav>
            </div>
            
            {/* User Account Controls */}
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 relative"
                aria-label="Notifications" tabIndex="0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">3</span>
              </button>
              <div className="relative group">
                <button className="flex items-center text-white hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  aria-label="User account" tabIndex="0">
                  <img src="/images/img_avatar.png" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                  <span className="ml-2 hidden md:inline">My Account</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/applications" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Applications
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                  <hr className="my-1" />
                  <Link to="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    Sign Out
                  </Link>
                </div>
              </div>
              <Button
                variant="primary"
                className="hidden md:block rounded-[10px] h-10 px-6 text-[14px] font-semibold border-none focus:ring-2 focus:ring-white focus:ring-opacity-50 bg-white text-accent-color hover:bg-gray-100"
              >
                Post a Job
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Filter Search Section - Enhanced */}
        <div className="bg-white py-6 shadow-md">
          <div className="container mx-auto px-4">
            {/* Main Search Bar */}
            <div className="mb-6">
              <InputField
                type="text"
                placeholder="Search for jobs, skills, or companies"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                inputClassName="py-3 text-[16px] rounded-lg"
                icon={
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />
            </div>
            
            {/* Filter Controls */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-semibold text-gray-800">Filters</h2>
              <button 
                onClick={resetFilters}
                className="text-[14px] text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                aria-label="Reset all filters"
              >
                Reset All
              </button>
            </div>
            
            {/* Filter Categories */}
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Location Filter */}
              <div className="flex-1 p-4 hover:bg-gray-50 transition-colors duration-200 relative border-r border-gray-200 last:border-r-0">
                <div className="flex justify-between items-center mb-2 cursor-pointer" onClick={() => toggleFilter('location')}>
                  <h3 className="text-[16px] font-semibold text-gray-800 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Location
                  </h3>
                  <svg 
                    className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${expandedFilters.location ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {expandedFilters.location && (
                  <div className="mt-3">
                    <Dropdown
                      options={locationOptions}
                      value={location}
                      onChange={setLocation}
                      placeholder="Select Location"
                      className="w-full"
                    />
                  </div>
                )}
              </div>
              
              {/* Job Type Filter */}
              <div className="flex-1 p-4 hover:bg-gray-50 transition-colors duration-200 relative border-r border-gray-200 last:border-r-0">
                <div className="flex justify-between items-center mb-2 cursor-pointer" onClick={() => toggleFilter('jobType')}>
                  <h3 className="text-[16px] font-semibold text-gray-800 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Job Type
                  </h3>
                  <svg 
                    className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${expandedFilters.jobType ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {expandedFilters.jobType && (
                  <div className="mt-3">
                    <Dropdown
                      options={jobTypeOptions}
                      value={jobType}
                      onChange={setJobType}
                      placeholder="Select Job Type"
                      className="w-full"
                    />
                  </div>
                )}
              </div>
              
              {/* Experience Level Filter */}
              <div className="flex-1 p-4 hover:bg-gray-50 transition-colors duration-200 relative border-r border-gray-200 last:border-r-0">
                <div className="flex justify-between items-center mb-2 cursor-pointer" onClick={() => toggleFilter('experience')}>
                  <h3 className="text-[16px] font-semibold text-gray-800 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Experience Level
                  </h3>
                  <svg 
                    className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${expandedFilters.experience ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {expandedFilters.experience && (
                  <div className="mt-3">
                    <Dropdown
                      options={experienceOptions}
                      value={experienceLevel}
                      onChange={setExperienceLevel}
                      placeholder="Select Experience Level"
                      className="w-full"
                    />
                  </div>
                )}
              </div>
              
              {/* Salary Range Filter */}
              <div className="flex-1 p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex justify-between items-center mb-2 cursor-pointer" onClick={() => toggleFilter('salary')}>
                  <h3 className="text-[16px] font-semibold text-gray-800 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Salary Range
                  </h3>
                  <svg 
                    className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${expandedFilters.salary ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {expandedFilters.salary && (
                  <div className="mt-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">{formatSalary(salaryRange[0])}</span>
                      <span className="text-sm text-gray-600">{formatSalary(salaryRange[1])}</span>
                    </div>
                    <Slider
                      min={50}
                      max={80}
                      step={5}
                      value={salaryRange}
                      onChange={setSalaryRange}
                      formatValue={formatSalary}
                      showValues={false}
                      className="px-1"
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Active Filters */}
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600 mr-2">Active filters:</span>
              {location && (
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                  Location: {locationOptions.find(opt => opt.value === location)?.label || location}
                  <button 
                    onClick={() => setLocation('')}
                    className="ml-2 focus:outline-none" 
                    aria-label="Remove location filter"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              {jobType && (
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                  Job Type: {jobTypeOptions.find(opt => opt.value === jobType)?.label || jobType}
                  <button 
                    onClick={() => setJobType('')}
                    className="ml-2 focus:outline-none" 
                    aria-label="Remove job type filter"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              {experienceLevel && (
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                  Experience: {experienceOptions.find(opt => opt.value === experienceLevel)?.label || experienceLevel}
                  <button 
                    onClick={() => setExperienceLevel('')}
                    className="ml-2 focus:outline-none" 
                    aria-label="Remove experience filter"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              {(salaryRange[0] !== 50 || salaryRange[1] !== 80) && (
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                  Salary: {formatSalary(salaryRange[0])} - {formatSalary(salaryRange[1])}
                  <button 
                    onClick={() => setSalaryRange([50, 80])}
                    className="ml-2 focus:outline-none" 
                    aria-label="Remove salary filter"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredJobs.length} Jobs Available
            </h2>
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
              <select 
                id="sort" 
                className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-2"
              >
                <option value="relevance">Relevance</option>
                <option value="recent">Most Recent</option>
                <option value="salary-high">Salary (High to Low)</option>
                <option value="salary-low">Salary (Low to High)</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                company={job.company}
                logo={job.logo}
                position={job.position}
                experience={job.experience}
                locationType={job.locationType}
                salary={job.salary}
                postedTime={job.postedTime}
                description={job.description}
                onApply={() => handleApply(job.id)}
                className="h-[316px]"
              />
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-900">No jobs found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search filters or try a different search.</p>
              <button 
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Reset Filters
              </button>
            </div>
          )}
          
          {filteredJobs.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center">
                <button className="mx-1 px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="mx-1 px-3 py-1 rounded-md bg-accent-color text-white border border-accent-color hover:bg-accent-dark">
                  1
                </button>
                <button className="mx-1 px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="mx-1 px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="mx-1 px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default JobSearchPlatform;
