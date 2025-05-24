import React from 'react';
import PropTypes from 'prop-types';
import Button from '../ui/Button';

const Card = ({
  company,
  logo,
  position,
  experience,
  locationType,
  salary,
  postedTime,
  description,
  onApply,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-[20px] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-4 w-full min-h-[280px] flex flex-col ${className}`}>
      {/* Content wrapper with flex-grow to push button to bottom */}
      <div className="flex-grow flex flex-col">
        {/* Top: Logo & Posted Time */}
        <div className="flex justify-between items-start">
          <div className="w-[82px] h-[82px] rounded-[12px] bg-[#f4f4f4] flex items-center justify-center shadow-sm">
            <img src={logo} alt={company} className="w-[65px] h-[65px] object-contain" />
          </div>

          <div className="bg-[#B0D9FF] px-3 py-[4px] rounded-[8px]">
            <span style={{
              color: '#000000',
              fontFamily: 'Satoshi',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center',
              display: 'inline-block'
            }}>
              {postedTime && !isNaN(new Date(postedTime).getTime()) 
                ? new Date(postedTime).toLocaleDateString() 
                : '24h Ago'}
            </span>
          </div>
        </div>

        {/* Position */}
        <h3 style={{
          fontFamily: 'Satoshi',
          fontWeight: 700,
          fontSize: '20px',
          lineHeight: '100%',
          letterSpacing: '0%',
          textAlign: 'left',
          color: '#000000',
          marginTop: '1rem',
          marginBottom: '0.5rem'
        }}>
          {position}
        </h3>

        {/* Tags: Experience | Onsite | Salary */}
        <div className="flex items-center justify-start mt-4 gap-x-4 whitespace-nowrap overflow-x-auto pb-2 scrollbar-hide" style={{
          scrollbarWidth: 'none',  /* Firefox */
          msOverflowStyle: 'none',  /* IE and Edge */
        }}>
          {/* Hide scrollbar for Chrome, Safari and Opera */}
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex items-center gap-1" style={{
            fontFamily: 'Satoshi',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#5A5A5A',
            textAlign: 'center'
          }}>
            <img src="/images/img_frame_48102935.svg" className="w-[14px] h-[14px]" alt="Exp" />
            {experience}
          </div>
          <div className="flex items-center gap-1" style={{
            fontFamily: 'Satoshi',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#5A5A5A',
            textAlign: 'center'
          }}>
            <img src="/images/img_frame_48102937.svg" className="w-[14px] h-[14px]" alt="Location" />
            {locationType}
          </div>
          <div className="flex items-center gap-1" style={{
            fontFamily: 'Satoshi',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#5A5A5A',
            textAlign: 'center'
          }}>
            <img src="/images/img_frame_48102939.svg" className="w-[14px] h-[14px]" alt="Salary" />
            {salary}
          </div>
        </div>

        {/* Description */}
        <div className="mt-2 flex-gow" style={{
          fontFamily: 'Satoshi',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '140%',
          letterSpacing: '0%',
          color: '#555555'
        }}>
          {description.split('\n').map((line, i) => (
            <div key={i} className="flex mb-1">
              <span className="mr-1">•</span>
              <span>{line.trim().replace(/^•\s*/, '')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <Button
        variant="primary"
        className="mt-4 w-full h-[44px] rounded-[10px] text-[14px] font-semibold bg-[#0099ff] text-white"
        onClick={onApply}
      >
        Apply Now
      </Button>
    </div>
  );
};

Card.propTypes = {
  company: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
  locationType: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  postedTime: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onApply: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Card;
