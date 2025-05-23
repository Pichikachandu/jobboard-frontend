import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useJobs } from '../../contexts/JobsContext';
import Header from '../../components/common/Header';
import SearchFilters from './components/SearchFilters';
import JobListings from './components/JobListings';
import Modal from '../../components/ui/Modal';
import CreateJobForm from '../../components/jobs/CreateJobForm';

const JobSearchPlatform = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);

  // Handle createJob query parameter
  useEffect(() => {
    const createJobParam = searchParams.get('createJob');
    if (createJobParam === 'true') {
      setIsCreateJobOpen(true);
    }
  }, [searchParams]);

  const handleCloseCreateJob = () => {
    setIsCreateJobOpen(false);
    // Remove the query parameter without triggering a page reload
    if (searchParams.get('createJob') === 'true') {
      searchParams.delete('createJob');
      setSearchParams(searchParams, { replace: true });
    }
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState([50, 80]);

  // Get jobs from context
  const { jobs } = useJobs();

  // Filter jobs based on search criteria
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchQuery === '' || 
      job.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = location === '' || 
      job.locationType.toLowerCase().includes(location.toLowerCase());
    
    const matchesJobType = jobType === '' || 
      job.position.toLowerCase().includes(jobType.toLowerCase());
    
    // For salary, we would need to parse the salary string
    // This is a simplified version
    return matchesSearch && matchesLocation && matchesJobType;
  });

  const handleApply = (jobId) => {
    // In a real application, this would navigate to an application page or open a modal
    console.log(`Applying for job with ID: ${jobId}`);
    alert(`Application submitted for job ID: ${jobId}`);
  };

  return (
    <div className="min-h-screen bg-[#fbfbff]">
      <Header />
      
      <main>
        {/* Create Job Modal */}
        <Modal isOpen={isCreateJobOpen} onClose={handleCloseCreateJob}>
          <CreateJobForm onClose={handleCloseCreateJob} />
        </Modal>
        <SearchFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          location={location}
          setLocation={setLocation}
          jobType={jobType}
          setJobType={setJobType}
          salaryRange={salaryRange}
          setSalaryRange={setSalaryRange}
        />
        
        <JobListings 
          jobs={filteredJobs} 
          onApply={handleApply} 
        />
      </main>
    </div>
  );
};

export default JobSearchPlatform;