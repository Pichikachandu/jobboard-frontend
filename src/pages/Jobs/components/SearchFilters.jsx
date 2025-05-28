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
  salaryRange = [50, 80],  // monthly thousands
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

  // Initialize with 50k-80k range
  const [localSalaryRange, setLocalSalaryRange] = React.useState([50, 80]);

  // Update parent component when local range changes
  React.useEffect(() => {
    setSalaryRange(localSalaryRange);
  }, [localSalaryRange, setSalaryRange]);

  // Format salary value in thousands, e.g. 50k
  const formatSalary = (value) => `${value}k`;

  return (
    <div className="w-full bg-white" style={{ width: '100%', margin: '0', padding: '0' }}>
      <div className="pt-4 pb-4">
        <div
          className="grid grid-cols-2 md:grid-cols-4 w-full relative"
          style={{
            columnGap: '90px',
            rowGap: '40px',
            width: '100%',
            maxWidth: '100%',
            margin: '0',
            padding: '0 32px',
            position: 'relative',
            boxSizing: 'border-box'
          }}
        >
          {/* Vertical Dividers */}
          <div style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: 'calc(25% + 10px)',
            borderLeft: '2px solid #D1D5DB',
            height: '48px',
            opacity: '0.8'
          }} />
          <div style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: 'calc(49% + 10px)',
            borderLeft: '2px solid #D1D5DB',
            height: '48px',
            opacity: '0.8'
          }} />
          <div style={{
            position: 'absolute',
            top: '0',
            bottom: '0px',
            left: 'calc(74% + 8px)',
            borderLeft: '2px solid #D1D5DB',
            height: '48px',
            opacity: '0.8'
          }} />

          {/* Search Field */}
          <div className="flex items-center relative w-full">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
              <img
                src="/images/img_vector.svg"
                alt="Search"
                className="w-5 h-5 text-gray-400"
                style={{ minWidth: '24px', minHeight: '24px' }}
              />
            </div>
            <InputField
              type="text"
              placeholder="Search By Job Title, Role"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-[-1px] pr-4 py-3 text-base text-gray-900 focus:ring-0 focus:outline-none focus:border-transparent"
              inputClassName="w-full border-0 shadow-none focus:ring-0 bg-transparent  focus-visible:outline-none placeholder:text-center"
              placeholderStyle={{
                fontFamily: 'Satoshi Variable',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#686868',
                opacity: 1
              }}
              style={{ outline: 'none', boxShadow: 'none' }}
            />
          </div>

          {/* Location Dropdown */}
          <div className="flex items-center relative">
            <Dropdown
              options={locationOptions}
              value={location}
              onChange={setLocation}
              placeholder="Preferred Location"
              className="w-full [&>div:first-child]:border-0 [&>div:first-child]:shadow-none [&>div:first-child]:p-0 [&>div:first-child]:bg-transparent [&:focus]:ring-0"
              icon={
                <div className="flex items-center justify-center mr-3" style={{ width: '32px', height: '32px' }}>
                  <img src="/images/img_vector_gray_700.svg" alt="Location" className="w-6 h-6" />
                </div>
              }
              controlClassName="pl-3 pr-8 focus:ring-0 focus:outline-none focus:border-transparent"
              placeholderClassName="text-base"
              arrowClassName="ml-6"
              menuClassName="focus:ring-0 focus:outline-none"
            />
          </div>

          {/* Job Type Dropdown */}
          <div className="flex items-center relative">
            <Dropdown
              options={jobTypeOptions}
              value={jobType}
              onChange={setJobType}
              placeholder="Job type"
              className="w-full [&>div:first-child]:border-0 [&>div:first-child]:shadow-none [&>div:first-child]:p-0 [&>div:first-child]:bg-transparent [&:focus]:ring-0"
              icon={
                <div className="flex items-center justify-center mr-4" style={{ width: '29px', height: '29px' }}>
                  <img src="/images/img_vector_gray_700_16x18.svg" alt="Job Type" className="w-6 h-6" />
                </div>
              }
              controlClassName="pl-2 xpr-6 focus:ring-0 focus:outline-none focus:border-transparent"
              placeholderClassName="text-base"
              arrowClassName="ml-5"
              menuClassName="focus:ring-0 focus:outline-none"
            />
          </div>

          {/* Salary Slider */}
          <div className="flex items-center">
            <div className="w-full pl-0">
              <div className="flex items-center justify-between mb-6">
                <span style={{
                  fontFamily: 'Satoshi',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#222222'
                }}>Salary Per Month</span>
                <span style={{
                  fontFamily: 'Satoshi',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#222222'
                }}>{formatSalary(localSalaryRange[0])} - {formatSalary(localSalaryRange[1])}</span>
              </div>
              <Slider
                min={0}
                max={200}
                step={5}
                value={localSalaryRange}
                onChange={setLocalSalaryRange}
                formatValue={formatSalary}
                showValues={false}
                className="px-1 mt-3"
                trackClassName="h-1 bg-gray-200 rounded-full"
                rangeClassName="bg-blue-500 h-1 rounded-full"
                thumbClassName="w-4 h-4 bg-black border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200"
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
