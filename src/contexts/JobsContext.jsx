import { createContext, useState, useContext, useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';

const defaultJobs = [
  {
    id: 1,
    company: 'Amazon',
    logo: '/images/img_image_77.png',
    position: 'Full Stack Developer',
    experience: '1-3 yr Exp',
    locationType: 'Onsite',
    salary: '12LPA',
    postedTime: '24h Ago',
    description: 'A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized',
    isDefault: true
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
    description: 'A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized',
    isDefault: true
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
    description: 'A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized',
    isDefault: true
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
    description: 'A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized',
    isDefault: true
  },
  {
    id: 5,
    company: 'Tesla',
    logo: '/images/img_image_79.png',
    position: 'Node Js Developer',
    experience: '1-3 yr Exp',
    locationType: 'Onsite',
    salary: '12LPA',
    postedTime: '24h Ago',
    description: 'A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized',
    isDefault: true
  },
  {
    id: 6,
    company: 'Swiggy',
    logo: '/images/img_image_78.png',
    position: 'UX/UI Designer',
    experience: '1-3 yr Exp',
    locationType: 'Onsite',
    salary: '12LPA',
    postedTime: '24h Ago',
    description: 'A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized',
    isDefault: true
  },
  {
    id: 7,
    company: 'Amazon',
    logo: '/images/img_image_77.png',
    position: 'Full Stack Developer',
    experience: '1-3 yr Exp',
    locationType: 'Onsite',
    salary: '12LPA',
    postedTime: '24h Ago',
    description: 'A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized',
    isDefault: true
  },
  {
    id: 8,
    company: 'Tesla',
    logo: '/images/img_image_79.png',
    position: 'Node Js Developer',
    experience: '1-3 yr Exp',
    locationType: 'Onsite',
    salary: '12LPA',
    postedTime: '24h Ago',
    description: 'A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized',
    isDefault: true
  }
];

// Default filter values
const DEFAULT_FILTERS = {
  search: '',
  location: 'All Locations',
  jobType: 'All Types',
  experience: 'All Experience',
  minSalary: '',
  maxSalary: '',
  company: '',
  sortBy: 'newest',
  page: 1,
  limit: 10
};

const API_URL = 'https://jobboard-backend-1swz.onrender.com/api/jobs';

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Combine default jobs with fetched jobs
  const [dbJobs, setDbJobs] = useState([]);

  // Fetch jobs from the backend with filters
  const fetchJobs = useCallback(async (customFilters = {}) => {
    try {
      setLoading(true);
      const mergedFilters = { ...filters, ...customFilters };
      
      // Only fetch from the database, we'll combine with default jobs later
      const response = await axios.get(API_URL, { params: mergedFilters });
      
      // Save database jobs to state
      setDbJobs(response.data);
      
      // Combine default jobs with database jobs
      const allJobs = [...defaultJobs, ...response.data];
      
      setJobs(allJobs);
      setTotalJobs(allJobs.length);
      setTotalPages(Math.ceil(allJobs.length / (mergedFilters.limit || 10)));
      setError(null);
      return allJobs;
    } catch (err) {
      console.error('Error fetching jobs:', err);
      // If there's an error, just show default jobs
      setJobs(defaultJobs);
      setTotalJobs(defaultJobs.length);
      setTotalPages(1);
      setError('Failed to fetch jobs. Showing default job listings.');
      return defaultJobs;
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Add a new job
  const addJob = async (jobData) => {
    // Create a temporary ID for optimistic UI update
    const tempId = `temp-${Date.now()}`;
    const newJob = {
      ...jobData,
      _id: tempId,
      postedTime: 'Just now',
      createdAt: new Date().toISOString(),
      isDefault: false
    };

    // Optimistically update the UI
    setDbJobs(prevDbJobs => [newJob, ...prevDbJobs]);
    setJobs(prevJobs => [newJob, ...prevJobs]);
    setTotalJobs(prev => prev + 1);
    
    try {
      // Make the actual API call
      const response = await axios.post(API_URL, newJob);
      
      // Update with the actual data from the server
      setDbJobs(prevDbJobs => 
        [response.data, ...prevDbJobs.filter(job => job._id !== tempId)]
      );
      setJobs(prevJobs => 
        [response.data, ...prevJobs.filter(job => job._id !== tempId)]
      );
      
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error adding job:', err);
      // Revert on error
      setDbJobs(prevDbJobs => prevDbJobs.filter(job => job._id !== tempId));
      setJobs(prevJobs => prevJobs.filter(job => job._id !== tempId));
      setTotalJobs(prev => Math.max(0, prev - 1));
      
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to add job. Please try again.' 
      };
    }
  };

  // Update a job
  const updateJob = async (id, jobData) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, jobData);
      
      // Update the database jobs list and combine with default jobs
      setDbJobs(prevDbJobs => 
        prevDbJobs.map(job => job._id === id ? response.data : job)
      );
      
      // Update the combined jobs list
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job._id === id ? response.data : 
          job.id === id ? response.data : job
        )
      );
      
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error updating job:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to update job. Please try again.' 
      };
    }
  };

  // Delete a job
  const deleteJob = async (id) => {
    try {
      // Only try to delete from database if it's not a default job
      const isDefaultJob = defaultJobs.some(job => job.id === id);
      
      if (!isDefaultJob) {
        await axios.delete(`${API_URL}/${id}`);
        setDbJobs(prevDbJobs => prevDbJobs.filter(job => job._id !== id));
      }
      
      // Remove from the combined jobs list
      setJobs(prevJobs => prevJobs.filter(job => 
        job._id !== id && job.id !== id
      ));
      
      setTotalJobs(prev => prev - 1);
      return { success: true };
    } catch (err) {
      console.error('Error deleting job:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to delete job. Please try again.' 
      };
    }
  };

  // Format job data to match our frontend structure
  const formatJob = useCallback((job) => {
    if (!job) return null;
    
    return {
      id: job._id,
      company: job.company,
      logo: job.logo || '/images/default-company.png',
      position: job.position,
      experience: job.experience || '1-3 yr Exp',
      locationType: job.locationType || 'Remote',
      salary: job.salary || 'Competitive salary',
      postedTime: job.postedTime || 'Recently',
      description: job.description || 'No description available',
      jobType: job.jobType || 'Full-time'
    };
  }, []);

  // Update filters and fetch jobs
  const updateFilters = useCallback((newFilters) => {
    const updatedFilters = {
      ...filters,
      ...newFilters,
      page: newFilters.resetPage ? 1 : filters.page
    };
    setFilters(updatedFilters);
    fetchJobs(updatedFilters);
  }, [filters, fetchJobs]);

  // Handle pagination
  const handlePageChange = useCallback((newPage) => {
    fetchJobs({ ...filters, page: newPage });
  }, [fetchJobs, filters]);

  // Apply for a job
  const applyForJob = useCallback(async (jobId) => {
    try {
      // In a real app, this would make an API call to apply for the job
      console.log(`Applied for job ${jobId}`);
      return { success: true };
    } catch (err) {
      console.error('Error applying for job:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to apply for job. Please try again.' 
      };
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <JobsContext.Provider
      value={{
        jobs,
        loading,
        error,
        filters,
        totalJobs,
        totalPages,
        fetchJobs,
        addJob,
        updateJob,
        deleteJob,
        formatJob,
        updateFilters,
        handlePageChange,
        applyForJob
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};

export default JobsContext;