import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../components/common/Card';

const JobListings = ({ jobs, onApply }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-4">
        {jobs.map((job) => (
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
            onApply={() => onApply(job.id)}
            className="h-full"
          />
        ))}
      </div>
    </div>
  );
};

JobListings.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      company: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      experience: PropTypes.string.isRequired,
      locationType: PropTypes.string.isRequired,
      salary: PropTypes.string.isRequired,
      postedTime: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  onApply: PropTypes.func.isRequired
};

export default JobListings;