import { createContext, useState, useContext, useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://jobboard-backend-1swz.onrender.com/api';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
      console.log('Fetching jobs from API...');
      const response = await api.get('/jobs');
      console.log('API response:', response);
      
      if (!response.data) {
        throw new Error('No data received from server');
      }
      
      // Transform the API jobs data
      const apiJobs = response.data.map(job => {
        const isRecent = job.createdAt && 
          (new Date() - new Date(job.createdAt)) < 5 * 60 * 1000; // 5 minutes
        
        return {
          ...job,
          id: job._id || job.id, // Handle both _id and id
          postedTime: isRecent ? 'Just now' : (job.postedTime || '24h Ago'),
          isDefault: false,
          locationType: job.locationType || job.location || 'Remote',
          logo: job.logo || '/images/default-company.png'
        };
      });
      
      // Combine with default jobs, ensuring no duplicates
      const existingIds = new Set(apiJobs.map(job => job.id));
      const uniqueDefaultJobs = defaultJobs.filter(job => !existingIds.has(job.id));
      const allJobs = [...apiJobs, ...uniqueDefaultJobs];
      
      console.log('Fetched jobs:', allJobs);
      setJobs(allJobs);
      return allJobs;
      
    } catch (err) {
      console.error('Error fetching jobs:', {
        error: err,
        response: err.response,
        message: err.message
      });
      
      // Fallback to default jobs if API fails
      setError('Failed to fetch jobs. Using default data.');
      setJobs(defaultJobs);
      return defaultJobs;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new job
  const createJob = useCallback(async (jobData) => {
    const isOptimistic = jobData.isOptimistic;
    const tempId = jobData.id;
    
    try {
      console.log('Creating job with data:', jobData);
      
      // Prepare job data for the API
      const jobToSubmit = {
        company: jobData.company,
        position: jobData.position,
        location: jobData.location || 'Remote',
        experience: jobData.experience || '1-3 yr Exp',
        salary: jobData.salary,
        description: jobData.description || 'No description provided.',
        jobType: jobData.jobType || 'Fulltime',
        logo: jobData.logo || '/images/default-company.png',
        postedTime: 'Just now',
        isDefault: false,
        createdAt: jobData.createdAt || new Date().toISOString()
      };

      // For optimistic updates, add the job to the list immediately
      if (isOptimistic) {
        setJobs(prevJobs => [jobData, ...prevJobs]);
      }

      console.log('Submitting job to API:', jobToSubmit);
      
      // Make the API call
      const response = await api.post('/jobs', jobToSubmit);
      console.log('API response:', response);
      
      if (!response.data) {
        throw new Error('No data received from server');
      }
      
      // Format the response data
      const newJob = {
        ...response.data,
        id: response.data._id || Math.random().toString(36).substr(2, 9),
        postedTime: 'Just now',
        isDefault: false,
        createdAt: response.data.createdAt || new Date().toISOString()
      };

      console.log('Formatted new job:', newJob);
      
      // Update the jobs list with the server response
      if (isOptimistic && tempId) {
        // Replace the optimistic update with the actual server response
        setJobs(prevJobs => {
          const updatedJobs = prevJobs.filter(job => job.id !== tempId);
          return [newJob, ...updatedJobs];
        });
      } else {
        // If not an optimistic update, just add the new job
        setJobs(prevJobs => [newJob, ...prevJobs]);
      }
      
      return { 
        success: true, 
        data: newJob 
      };
    } catch (err) {
      console.error('Error creating job:', {
        error: err,
        response: err.response,
        message: err.message
      });
      
      // If it was an optimistic update, remove the temporary job
      if (isOptimistic && tempId) {
        setJobs(prevJobs => prevJobs.filter(job => job.id !== tempId));
      }
      
      // Re-throw the error to be handled by the component
      throw new Error(err.response?.data?.message || err.message || 'Failed to create job');
    }
  }, []);

  // Update a job
  const updateJob = useCallback(async (id, jobData) => {
    try {
      const response = await api.put(`/jobs/${id}`, jobData);
      const updatedJob = {
        ...response.data,
        id: response.data._id || id,
        isDefault: false
      };
      
      setJobs(prevJobs => 
        prevJobs.map(job => job.id === id ? updatedJob : job)
      );
      
      return { success: true, data: updatedJob };
    } catch (err) {
      console.error('Error updating job:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to update job.' 
      };
    }
  }, []);

  // Delete a job
  const deleteJob = useCallback(async (id) => {
    try {
      await api.delete(`/jobs/${id}`);
      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error deleting job:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to delete job.' 
      };
    }
  }, []);

  // Get a single job by ID
  const getJobById = useCallback(async (id) => {
    try {
      // First check if job exists in local state
      const localJob = jobs.find(job => job.id === id);
      if (localJob) return localJob;
      
      // If not found locally, try to fetch from API
      const response = await api.get(`/jobs/${id}`);
      return {
        ...response.data,
        id: response.data._id,
        isDefault: false
      };
    } catch (err) {
      console.error('Error fetching job:', err);
      return null;
    }
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
