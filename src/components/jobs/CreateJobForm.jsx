import React, { useState, useContext } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../ui/Dropdown';
import { useJobs } from '../../contexts/JobsContext';

const SalaryIcon = ({ className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    height="24px" 
    viewBox="0 -960 960 960" 
    width="24px" 
    fill="#e3e3e3"
    className={className}
  >
    <path d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z"/>
  </svg>
);

const CreateJobForm = ({ onClose }) => {
  const { addJob } = useJobs();
  const navigate = useNavigate();
  
  const [activeField, setActiveField] = useState(null);

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const getLabelStyle = (field) => ({
    fontFamily: 'Satoshi',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '100%',
    letterSpacing: '0%',
    color: activeField === field ? '#222222' : '#636363',
    transition: 'color 0.2s ease-in-out'
  });
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

  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    jobType: 'fulltime',
    minSalary: '',
    maxSalary: '',
    jobDescription: '',
    applicationDeadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For salary inputs, only allow numbers and commas
    if (name === 'minSalary' || name === 'maxSalary') {
      // Remove any non-numeric characters except commas
      const sanitizedValue = value.replace(/[^0-9,]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: sanitizedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSalaryIncrement = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: Math.max(0, (parseInt(prev[field].replace(/,/g, '') || '0') + 1000)).toLocaleString()
    }));
  };

  const handleSalaryDecrement = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: Math.max(0, (parseInt(prev[field].replace(/,/g, '') || '0') - 1000)).toLocaleString()
    }));
  };

  const handleDropdownChange = (field) => (value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Basic validation
      if (!formData.jobTitle.trim() || !formData.companyName.trim()) {
        throw new Error('Job title and company name are required');
      }

      // Format the salary
      const formattedMinSalary = formData.minSalary ? `$${formData.minSalary.replace(/,/g, '')}` : '';
      const formattedMaxSalary = formData.maxSalary ? `$${formData.maxSalary.replace(/,/g, '')}` : '';
      const salary = formattedMinSalary && formattedMaxSalary 
        ? `${formattedMinSalary}-${formattedMaxSalary}` 
        : formattedMinSalary || formattedMaxSalary || 'Competitive salary';

      // Format the job data to match the backend model
      const newJob = {
        company: formData.companyName.trim(),
        position: formData.jobTitle.trim(),
        locationType: formData.location || 'Remote',
        experience: formData.experience || '1-3 yr Exp',
        salary: salary,
        description: formData.jobDescription?.trim() || 'No description provided.',
        jobType: formData.jobType?.charAt(0).toUpperCase() + formData.jobType?.slice(1) || 'Fulltime',
        logo: '/images/default-company.png',
        postedTime: '24h Ago',
        isDefault: false
      };

      console.log('Submitting job:', newJob);
      
      // Add the job using context
      const result = await addJob(newJob);
      
      if (result?.success) {
        // Show success message
        alert('Job posted successfully!');
        
        // Reset the form
        setFormData({
          jobTitle: '',
          companyName: '',
          location: '',
          jobType: 'fulltime',
          minSalary: '',
          maxSalary: '',
          jobDescription: '',
          applicationDeadline: ''
        });
        
        // Close the form and navigate back to job listings
        if (onClose) {
          onClose();
        } else {
          navigate('/jobs');
        }
      } else {
        throw new Error(result?.error || 'Failed to post job');
      }
    } catch (error) {
      console.error('Error submitting job:', error);
      alert(error.message || 'Failed to post job. Please check the form and try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-[750px] max-h-[70vh] flex flex-col" style={{
        boxShadow: '0px 0px 24px 0px #A9A9A940',
        borderRadius: '16px',
        minHeight: '680px'
      }}>
        {/* Header */}
        <div className="pt-8 px-6">
          <h2 style={{
            fontFamily: 'Satoshi',
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#222222',
            margin: '0 auto 24px',
            textAlign: 'center',
            width: 'fit-content'
          }}>
            Create Job Opening
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 flex-1 flex flex-col">
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Job Title */}
            <div className="space-y-1">
              <label className="block mb-1" style={getLabelStyle('jobTitle')}>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                onFocus={() => handleFocus('jobTitle')}
                onBlur={handleBlur}
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Full Stack Developer"
                className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                style={{
                  fontFamily: 'Satoshi',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#111827',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  padding: '8px 12px'
                }}
              />
            </div>

            {/* Company Name */}
            <div className="space-y-1">
              <label className="block mb-1" style={getLabelStyle('companyName')}>Company Name</label>
              <input
                type="text"
                name="companyName"
                onFocus={() => handleFocus('companyName')}
                onBlur={handleBlur}
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Amazon, Microsoft, Swiggy"
                className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                style={{
                  fontFamily: 'Satoshi',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#111827',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  padding: '8px 12px'
                }}
              />
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="block mb-1" style={getLabelStyle('location')}>Location</label>
              <Dropdown
                options={locationOptions}
                onFocus={() => handleFocus('location')}
                onBlur={handleBlur}
                value={formData.location}
                onChange={handleDropdownChange('location')}
                placeholder="Choose Preferred Location"
                className="w-full h-10"
                dropdownClassName="w-full"
                style={{
                  fontFamily: 'Satoshi',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#111827',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                }}
              />
            </div>

            {/* Job Type */}
            <div className="space-y-1">
              <label className="block mb-1" style={getLabelStyle('jobType')}>Job Type</label>
              <Dropdown
                options={jobTypeOptions}
                onFocus={() => handleFocus('jobType')}
                onBlur={handleBlur}
                value={formData.jobType}
                onChange={handleDropdownChange('jobType')}
                placeholder="Select job type"
                className="w-full h-10"
                dropdownClassName="w-full"
                style={{
                  fontFamily: 'Satoshi',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#111827',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                }}
              />
            </div>

            {/* Salary Range */}
            <div className="space-y-1">
              <label className="block mb-1" style={getLabelStyle('salaryRange')}>Salary Range</label>
              <div className="flex items-center space-x-4">
                {/* Min Salary */}
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <SalaryIcon className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="minSalary"
                    onFocus={() => handleFocus('minSalary')}
                    onBlur={handleBlur}
                    value={formData.minSalary}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full h-10 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={{
                      fontFamily: 'Satoshi',
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#111827',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      padding: '8px 36px 8px 36px',
                      textIndent: '8px'
                    }}
                  />
                  <div className="absolute right-0 top-0 h-10 w-8 flex flex-col items-center justify-center border-l border-gray-200">
                    <button 
                      type="button" 
                      className="w-full h-1/2 flex items-center justify-center text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => handleSalaryIncrement('minSalary')}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 7.5L6 4L2.5 7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className="w-full h-px bg-gray-200"></div>
                    <button 
                      type="button" 
                      className="w-full h-1/2 flex items-center justify-center text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => handleSalaryDecrement('minSalary')}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <span className="text-gray-500">-</span>
                
                {/* Max Salary */}
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <SalaryIcon className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="maxSalary"
                    onFocus={() => handleFocus('maxSalary')}
                    onBlur={handleBlur}
                    value={formData.maxSalary}
                    onChange={handleChange}
                    placeholder="12,00,000"
                    className="w-full h-10 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={{
                      fontFamily: 'Satoshi',
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#111827',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      padding: '8px 36px 8px 36px',
                      textIndent: '8px'
                    }}
                  />
                  <div className="absolute right-0 top-0 h-10 w-8 flex flex-col items-center justify-center border-l border-gray-200">
                    <button 
                      type="button" 
                      className="w-full h-1/2 flex items-center justify-center text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => handleSalaryIncrement('maxSalary')}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 7.5L6 4L2.5 7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className="w-full h-px bg-gray-200"></div>
                    <button 
                      type="button" 
                      className="w-full h-1/2 flex items-center justify-center text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => handleSalaryDecrement('maxSalary')}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Deadline */}
            <div className="space-y-1">
              <label className="block mb-1" style={getLabelStyle('applicationDeadline')}>Application Deadline</label>
              <input
                type="date"
                name="applicationDeadline"
                onFocus={() => handleFocus('applicationDeadline')}
                onBlur={handleBlur}
                value={formData.applicationDeadline}
                onChange={handleChange}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                style={{
                  fontFamily: 'Satoshi',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: formData.applicationDeadline ? '#111827' : '#9CA3AF',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  padding: '8px 12px'
                }}
              />
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-6 flex-1 flex flex-col">
            <label className="block mb-1" style={getLabelStyle('jobDescription')}>Job Description</label>
            <div className="flex-1">
              <textarea
                name="jobDescription"
                onFocus={() => handleFocus('jobDescription')}
                onBlur={handleBlur}
                value={formData.jobDescription}
                onChange={handleChange}
                placeholder="Please share a description to let the candidate know more about the job role"
                className="w-full h-full min-h-[150px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                style={{
                  fontFamily: 'Satoshi',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#111827',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  padding: '12px',
                  resize: 'none',
                  minHeight: '150px',
                  height: '150px',
                  overflow: 'auto'
                }}
              />
            </div>
          </div>



          {/* Buttons */}
          <div className="flex justify-between pt-0 mt-0 px-0 pb-0">
            <button
              type="button"
              style={{
                width: '232px',
                height: '59px',
                fontFamily: 'Satoshi',
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '100%',
                letterSpacing: '0%',
                borderRadius: '10px',
                border: '1.5px solid #222222',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#F9FAFB';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#FFFFFF';
              }}
            >
              Save Draft
              <svg width="24" height="24" viewBox="0 -960 960 960" fill="#222222" style={{
                marginLeft: '8px',
                marginTop: '2px'
              }}>
                <path d="M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z"/>
              </svg>
            </button>
            <button
              type="submit"
              style={{
                width: '207px',
                height: '59px',
                fontFamily: 'Satoshi',
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '100%',
                letterSpacing: '0%',
                background: '#00AAFF',
                color: '#FFFFFF',
                borderRadius: '10px',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#0095E0';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#00AAFF';
              }}
            >
              Publish
              <svg width="24" height="24" viewBox="0 -960 960 960" fill="#ffffff" style={{
                marginLeft: '8px',
                marginTop: '2px'
              }}>
                <path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobForm;
