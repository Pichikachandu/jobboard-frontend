import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../components/ui/InputField';
import Dropdown from '../../../components/ui/Dropdown';
import Slider from '../../../components/ui/Slider';

const SearchFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  location, 
  setLocation, 
  jobType, 
  setJobType, 
  salaryRange, 
  setSalaryRange 
}) => {
  const locationOptions = [
    { value: 'remote', label: 'Remote' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'hyderabad', label: 'Hyderabad' }
  ];

  const jobTypeOptions = [
    { value: 'fulltime', label: 'Full Time' },
    { value: 'parttime', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' }
  ];

  const formatSalary = (value) => {
    return `₹${value}k`;
  };

  return (
    <div className="w-full bg-white py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative flex items-center">
            <InputField
              type="text"
              placeholder="Search By Job Title, Role"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              inputClassName="border-0 shadow-none focus:ring-0"
              icon={
                <img src="/images/img_vector.svg" alt="Search" className="w-[18px] h-[18px]" />
              }
            />
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-10 w-px bg-gray-200"></div>
          </div>
          
          <div className="relative flex items-center">
            <Dropdown
              options={locationOptions}
              value={location}
              onChange={setLocation}
              placeholder="Preferred Location"
              className="w-full [&>div:first-child]:border-0 [&>div:first-child]:shadow-none [&>div:first-child]:p-0 [&>div:first-child]:bg-transparent"
              icon={
                <img src="/images/img_vector_gray_700.svg" alt="Location" className="w-[16px] h-[21px]" />
              }
            />
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-10 w-px bg-gray-200"></div>
          </div>
          
          <div className="relative flex items-center">
            <Dropdown
              options={jobTypeOptions}
              value={jobType}
              onChange={setJobType}
              placeholder="Job type"
              className="w-full [&>div:first-child]:border-0 [&>div:first-child]:shadow-none [&>div:first-child]:p-0 [&>div:first-child]:bg-transparent"
              icon={
                <img src="/images/img_vector_gray_700_16x18.svg" alt="Job Type" className="w-[16px] h-[18px]" />
              }
            />
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-10 w-px bg-gray-200"></div>
          </div>
          
          <div className="relative flex items-center pl-4">
            <div className="w-full">
              <div className="flex items-center justify-between mb-3">
                <span style={{
                  fontFamily: 'Satoshi',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: '#222222'
                }}>Salary Per Month</span>
                <span style={{
                  fontFamily: 'Satoshi',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: '#222222'
                }}>{`₹${salaryRange[0]}k - ₹${salaryRange[1]}k`}</span>
              </div>
              <Slider
                min={10}
                max={100}
                step={1}
                value={salaryRange}
                onChange={setSalaryRange}
                formatValue={formatSalary}
                showValues={false}
                className="px-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SearchFilters.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  location: PropTypes.string,
  setLocation: PropTypes.func.isRequired,
  jobType: PropTypes.string,
  setJobType: PropTypes.func.isRequired,
  salaryRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSalaryRange: PropTypes.func.isRequired
};

export default SearchFilters;