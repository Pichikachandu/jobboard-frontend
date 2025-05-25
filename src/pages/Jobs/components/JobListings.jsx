import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../components/common/Card';

const JobListings = ({ jobs = [], onApply, loading, error }) => {
  // Handle loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Always show default cards when no jobs are found
  const displayJobs = jobs.length > 0 ? jobs : [];
  
  // If we have no jobs to display (shouldn't happen with default jobs)
  if (displayJobs.length === 0 && !loading && !error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      </div>
    );
  }

  // Render job listings
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-4">
        {displayJobs.map((job) => {
          // Format the job data to ensure all required fields are present
          const isRecent = job.createdAt && 
            (new Date() - new Date(job.createdAt)) < 5 * 60 * 1000; // 5 minutes in milliseconds
            
          const jobData = {
            ...job,
            id: job.id || job._id,
            company: job.company || 'Company Name',
            logo: job.logo || '/images/default-logo.png',
            position: job.position || 'Job Position',
            experience: job.experience || 'Experience not specified',
            // Only include locationType if it exists, otherwise include location if it exists
            ...(job.locationType ? { locationType: job.locationType } : 
                job.location ? { location: job.location } : {}
            ),
            salary: job.salary || 'Salary not specified',
            postedTime: isRecent ? 'Just now' : 
              (job.postedTime || (job.createdAt ? new Date(job.createdAt).toLocaleDateString() : '24h Ago')),
            description: job.description || 'No description available'
          };
          
          return (
            <Card
              key={jobData.id}
              {...jobData}
              onApply={onApply ? () => onApply(jobData.id) : undefined}
              className="h-full"
            />
          );
        })}
      </div>
    </div>
  );
};

JobListings.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      company: PropTypes.string,
      logo: PropTypes.string,
      position: PropTypes.string,
      experience: PropTypes.string,
      locationType: PropTypes.string,
      location: PropTypes.string,
      salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      postedTime: PropTypes.string,
      createdAt: PropTypes.string,
      description: PropTypes.string
    })
  ),
  onApply: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

JobListings.defaultProps = {
  jobs: [],
  loading: false,
  error: null
};

export default JobListings;