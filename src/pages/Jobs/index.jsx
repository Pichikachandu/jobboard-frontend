import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useJobs } from '../../contexts/JobsContext';
import { toast } from 'react-toastify';
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
  // Salary range in thousands (e.g., [50, 100] means 50k to 100k per month)
  const [salaryRange, setSalaryRange] = useState([50, 100]);

  // Get jobs and loading/error states from context
  const { jobs, loading, error, fetchJobs } = useJobs();

  // Fetch jobs when component mounts
  useEffect(() => {
    const loadJobs = async () => {
      try {
        await fetchJobs();
      } catch (err) {
        console.error('Failed to load jobs:', err);
      }
    };
    
    loadJobs();
  }, [fetchJobs]);

  // Convert LPA to monthly salary in thousands
  const lpaToMonthly = (lpa) => {
    // 1 LPA = 1,00,000 per year = ~8,333 per month = ~8.33k per month
    return (lpa * 100) / 12; // Convert LPA to thousands per month
  };

  // Convert monthly salary in thousands to LPA
  const monthlyToLPA = (monthly) => {
    // monthly is in thousands, so (monthly * 12) / 100 = LPA
    return (monthly * 12) / 100;
  };

  // Extract numeric value from salary string (e.g., '12LPA' -> 12)
  const extractSalaryValue = (salaryStr) => {
    if (!salaryStr) return 0;
    const match = salaryStr.toString().match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  // Filter jobs based on search criteria
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      if (!job) return false;
      
      // Search by job title or company
      const matchesSearch = searchQuery === '' || 
        (job.position && job.position.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.company && job.company.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Filter by location (case-insensitive)
      const matchesLocation = location === '' || 
        (job.locationType && job.locationType.toLowerCase() === location.toLowerCase()) ||
        (job.location && job.location.toLowerCase() === location.toLowerCase());
      
      // Filter by job type (case-insensitive and more flexible matching)
      const matchesJobType = jobType === '' || 
        (job.jobType && job.jobType.toLowerCase() === jobType.toLowerCase()) ||
        (job.jobType && job.jobType.toLowerCase().includes(jobType.toLowerCase()));
      
      // Filter by monthly salary range
      const jobSalaryStr = job.salary || job.maxSalary || job.minSalary || '';
      const jobSalaryLPA = extractSalaryValue(jobSalaryStr);
      const jobMonthlySalary = lpaToMonthly(jobSalaryLPA);
      const [minMonthly, maxMonthly] = salaryRange;
      const matchesSalary = jobMonthlySalary >= minMonthly && jobMonthlySalary <= maxMonthly;
      
      return matchesSearch && matchesLocation && matchesJobType && matchesSalary;
    });
  }, [jobs, searchQuery, location, jobType, salaryRange]);

  const handleApply = (jobId) => {
    // In a real application, this would navigate to an application page or open a modal
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
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="bg-white shadow-sm">
        <div className="w-full max-w-full px-9">
          <Header />
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
        </div>
      </div>
      
      <main className="w-full px-0" style={{ paddingTop: '6px' }}>
        {/* Create Job Modal */}
        <Modal isOpen={isCreateJobOpen} onClose={handleCloseCreateJob}>
          <CreateJobForm onClose={handleCloseCreateJob} />
        </Modal>

        <div className="w-full" style={{ marginTop: '32px' }}>
          <JobListings 
            jobs={filteredJobs} 
            onApply={handleApply}
            loading={loading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default JobSearchPlatform;