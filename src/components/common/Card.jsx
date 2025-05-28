import React from 'react';
import PropTypes from 'prop-types';
import Button from '../ui/Button';
import { formatRelativeTime, isDefaultJob } from '../../utils/timeUtils';

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
    <div className={`relative bg-white overflow-hidden ${className}`} style={{ 
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 0px 14px 0px #D3D3D326',
      borderRadius: '15px',
      width: '100%',
      minHeight: '380px',
      display: 'flex',
      flexDirection: 'column',
      margin: '0',
      flex: '1 1 0%',
      minWidth: '0',
      maxWidth: '100%',
      boxSizing: 'border-box',
      height: '100%',
      overflow: 'hidden' // Prevent any content from overflowing the card
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '20px',
        flex: '1 1 auto',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden' // Ensure content doesn't overflow the padding
      }}>
        {/* Top: Logo & Posted Time */}
        <div className="flex justify-between items-start w-full">
          {/* Logo Container */}
          <div style={{
            width: '82px',
            height: '82px',
            borderRadius: '13.18px',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            background: '#F9FAFB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <img 
              src={logo} 
              alt={company} 
              style={{
                width: '65px',
                height: '65px',
                objectFit: 'contain'
              }} 
            />
          </div>
          
          {/* Posted Time Badge */}
          <div className="bg-[#B0D9FF] px-3 py-[4px] rounded-[8px] min-w-[80px] text-center">
            <span style={{
              color: '#000000',
              fontFamily: 'Satoshi',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              display: 'inline-block'
            }}>
              {isDefaultJob({ isDefault: postedTime === 'Just now' ? false : true, createdAt: postedTime })
                ? postedTime
                : formatRelativeTime(postedTime)}
            </span>
          </div>
        </div>

        {/* Position */}
        <h3 style={{
          fontFamily: '"Satoshi", sans-serif',
          fontWeight: 700,
          fontSize: '20px',
          lineHeight: '100%',
          letterSpacing: '0%',
          textAlign: 'left',
          color: '#000000',
          margin: '16px 0 8px 0',
          width: '190px',
          height: '27px',
          display: 'flex',
          alignItems: 'center'
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
          <div className="flex items-center gap-2" style={{
            fontFamily: 'Satoshi',
            fontWeight: 500,
            fontSize: '17px',
            lineHeight: '120%',
            letterSpacing: '0%',
            color: '#5A5A5A',
            textAlign: 'center'
          }}>
            <img src="/images/img_frame_48102935.svg" className="w-5 h-5" alt="Exp" />
            {experience}
          </div>
          {locationType || location ? (
            <div className="flex items-center gap-2" style={{
              fontFamily: 'Satoshi',
              fontWeight: 500,
              fontSize: '17px',
              lineHeight: '120%',
              letterSpacing: '0%',
              color: '#5A5A5A',
              textAlign: 'center',
              textTransform: 'capitalize'
            }}>
              <img src="/images/img_frame_48102937.svg" className="w-5 h-5" alt="Location" />
              {locationType || (location && location.charAt(0).toUpperCase() + location.slice(1))}
            </div>
          ) : null}
          <div className="flex items-center gap-2" style={{
            fontFamily: 'Satoshi',
            fontWeight: 500,
            fontSize: '17px',
            lineHeight: '120%',
            letterSpacing: '0%',
            color: '#5A5A5A',
            textAlign: 'center'
          }}>
            <img src="/images/img_frame_48102939.svg" className="w-5 h-5" alt="Salary" />
            {typeof salary === 'string' && salary.includes('-') 
              ? `₹${salary.split('-').pop().trim()}` 
              : salary}
          </div>
        </div>

        {/* Description */}
        <div className="mt-2" style={{
          fontFamily: 'Satoshi',
          fontWeight: 500,
          fontSize: '15px',
          lineHeight: '150%',
          letterSpacing: '0.2px',
          color: '#555555',
          flex: '1 1 auto',
          overflow: 'hidden',
          marginTop: '8px'
        }}>
          {description.split('\n').map((line, i) => (
            <div key={i} className="flex items-baseline" style={{ marginBottom: '0px' }}>
              <span className="mr-2">•</span>
              <span style={{ lineHeight: '150%' }}>{line.trim().replace(/^•\s*/, '')}</span>
            </div>
          ))}
        </div>

        {/* Apply Button */}
        <div className="mt-4" style={{
          marginTop: 'auto',
          width: '100%',
          paddingTop: '16px'
        }}>
          <Button
            variant="primary"
            className="h-[46px] w-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
            style={{
              background: '#00AAFF',
              border: '1px solid #00AAFF',
              borderRadius: '12px',
              boxShadow: '0px 0px 14px 0px #5D5D5D26',
              padding: '12px 24px',
              gap: '10px',
              maxWidth: '100%'
            }}
            onClick={onApply}
          >
            <span style={{
              fontFamily: '"Satoshi", sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '22px',
              letterSpacing: '0%',
              color: '#FFFFFF',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              padding: '0 8px'
            }}>
              Apply Now
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  company: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
  locationType: PropTypes.string,
  location: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  postedTime: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onApply: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Card;