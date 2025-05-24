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
    description: ' A user-friendly interface lets you browse stunning photos and videos\n• Filter destinations based on interests and travel style, and create personalized',
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
    description: ' A user-friendly interface lets you browse stunning photos and videos\n• Filter destinations based on interests and travel style, and create personalized',
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
    description: 'A user-friendly interface lets you browse stunning photos and videos\n• Filter destinations based on interests and travel style, and create personalized',
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
    description: 'A user-friendly interface lets you browse stunning photos and videos\n• Filter destinations based on interests and travel style, and create personalized',
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
    description: ' A user-friendly interface lets you browse stunning photos and videos\n• Filter destinations based on interests and travel style, and create personalized',
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
    description: 'A user-friendly interface lets you browse stunning photos and videos\n• Filter destinations based on interests and travel style, and create personalized',
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
    description: 'A user-friendly interface lets you browse stunning photos and videos\n• Filter destinations based on interests and travel style, and create personalized',
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
    description: 'A user-friendly interface lets you browse stunning photos and videos\n• Filter destinations based on interests and travel style, and create personalized',
    isDefault: true
  }
];

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState(defaultJobs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch jobs from API
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://jobboard-backend-1swz.onrender.com/api/jobs');
      setJobs([...defaultJobs, ...response.data]);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to fetch jobs. Using default data.');
      // Keep using default jobs if API fails
      setJobs(defaultJobs);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new job
  const createJob = useCallback(async (jobData) => {
    try {
      const response = await axios.post('https://jobboard-backend-1swz.onrender.com/api/jobs', jobData);
      setJobs(prevJobs => [...prevJobs, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error creating job:', err);
      throw err;
    }
  }, []);

  // Update a job
  const updateJob = useCallback(async (id, jobData) => {
    try {
      const response = await axios.put(`https://jobboard-backend-1swz.onrender.com/api/jobs/${id}`, jobData);
      setJobs(prevJobs => prevJobs.map(job => job.id === id ? response.data : job));
      return response.data;
    } catch (err) {
      console.error('Error updating job:', err);
      throw err;
    }
  }, []);

  // Delete a job
  const deleteJob = useCallback(async (id) => {
    try {
      await axios.delete(`https://jobboard-backend-1swz.onrender.com/api/jobs/${id}`);
      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting job:', err);
      throw err;
    }
  }, []);

  // Get a single job by ID
  const getJobById = useCallback((id) => {
    return jobs.find(job => job.id === id);
  }, [jobs]);

  // Filter jobs by search query
  const searchJobs = useCallback((query) => {
    if (!query.trim()) return jobs;
    
    const searchTerm = query.toLowerCase();
    return jobs.filter(job => 
      job.position.toLowerCase().includes(searchTerm) ||
      job.company.toLowerCase().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm)
    );
  }, [jobs]);

  // Memoize the context value
  const contextValue = useMemo(() => ({
    jobs,
    loading,
    error,
    fetchJobs,
    createJob,
    updateJob,
    deleteJob,
    getJobById,
    searchJobs,
  }), [jobs, loading, error, fetchJobs, createJob, updateJob, deleteJob, getJobById, searchJobs]);

  return (
    <JobsContext.Provider value={contextValue}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};

export default JobsContext;
