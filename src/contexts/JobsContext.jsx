// src/contexts/JobsContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs';

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
    description: 'A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized'
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
    description: 'A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized'
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
    description: 'A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized'
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
    description: 'A user-friendly interface lets you browse stunning photos and videos\nFilter destinations based on interests and travel style, and create personalized'
  }
];

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format job data to match our frontend structure
  const formatJob = (job) => {
    if (!job) return null;
    return {
      ...job,
      id: job._id || job.id, // Handle both MongoDB _id and local id
      logo: job.logo || '/images/default-company.png',
      postedTime: job.createdAt ? 'Just now' : (job.postedTime || '24h Ago'),
      experience: job.experience || '1-3 yr Exp',
      locationType: job.locationType || job.location || 'Onsite',
      position: job.jobTitle || job.position,
      company: job.companyName || job.company,
      salary: job.salaryRange || job.salary || '12LPA',
      description: (job.jobDescription || job.description || 'No description provided')
        .split('\n')
        .slice(0, 2)
        .join('\n'),
    };
  };

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      
      // Format API jobs and combine with default jobs
      const apiJobs = response.data.map(formatJob).filter(Boolean);
      const allJobs = [...apiJobs, ...defaultJobs];
      
      // Remove duplicates by ID
      const uniqueJobs = allJobs.filter(
        (job, index, self) => 
          index === self.findIndex((j) => 
            (j.id && j.id === job.id) || 
            (j._id && j._id === job._id)
          )
      );
      
      setJobs(uniqueJobs);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err.message);
      // Fallback to default jobs if API fails
      setJobs(defaultJobs.map(job => formatJob(job)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Add new job
  const addJob = async (jobData) => {
    try {
      // Transform the job data to match the backend model
      const jobToSave = {
        company: jobData.companyName || jobData.company,
        logo: jobData.logo || '/images/default-company.png',
        position: jobData.jobTitle || jobData.position,
        experience: jobData.experience || '1-3 yr Exp',
        locationType: jobData.location || 'Onsite',
        salary: jobData.salary || '12LPA',
        description: jobData.jobDescription || jobData.description || 'No description provided',
        jobType: jobData.jobType || 'Full Time',
        applicationDeadline: jobData.applicationDeadline || 'Not specified'
      };

      console.log('Sending job data:', jobToSave);
      
      const response = await axios.post(API_URL, jobToSave);
      const newJob = formatJob(response.data);
      
      // Add the new job to the beginning of the list
      setJobs(prevJobs => {
        // Filter out any job with the same ID to prevent duplicates
        const filteredJobs = prevJobs.filter(job => 
          job.id !== newJob.id && 
          (!job._id || job._id !== newJob._id)
        );
        return [newJob, ...filteredJobs];
      });
      
      return newJob;
    } catch (err) {
      console.error('Error adding job:', err);
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return (
    <JobsContext.Provider value={{ 
      jobs, 
      loading, 
      error, 
      addJob, 
      fetchJobs 
    }}>
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