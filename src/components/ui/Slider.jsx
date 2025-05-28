import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  value = [min, max],
  onChange,
  label,
  showValues = true,
  formatValue = (val) => val,
  className = '',
  trackClassName = '',
  thumbClassName = '',
  disabled = false,
  ...props
}) => {
  const [values, setValues] = useState(value);
  const [isDragging, setIsDragging] = useState(null);
  const trackRef = useRef(null);

  useEffect(() => {
    setValues(value);
  }, [value]);

  const getPercentage = (val) => ((val - min) / (max - min)) * 100;

  const handleMouseDown = (index, e) => {
    if (disabled) return;
    setIsDragging(index);
  };

  const handleMouseMove = (e) => {
    if (isDragging === null || disabled) return;
    const rect = trackRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = Math.min(Math.max(0, offsetX / rect.width), 1);
    const newValue = Math.round((percentage * (max - min) + min) / step) * step;

    const newValues = [...values];
    newValues[isDragging] = newValue;

    if (isDragging === 0 && newValue > values[1]) {
      newValues[isDragging] = values[1];
    } else if (isDragging === 1 && newValue < values[0]) {
      newValues[isDragging] = values[0];
    }

    setValues(newValues);
    onChange && onChange(newValues);
  };

  const handleMouseUp = () => setIsDragging(null);

  useEffect(() => {
    if (isDragging !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, values]);

  return (
    <div className={`w-full ${className}`}>
      {(label || showValues) && (
        <div className="flex justify-between items-center text-sm font-medium text-black mb-3">
          {label && <span>{label}</span>}
          {showValues && <span>₹{formatValue(values[0])} - ₹{formatValue(values[1])}</span>}
        </div>
      )}

      <div
        ref={trackRef}
        className={`
          relative h-[2px] bg-gray-300 rounded-full
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${trackClassName}
        `}
        {...props}
      >
        <div
          className="absolute h-full bg-black rounded-full"
          style={{
            left: `${getPercentage(values[0])}%`,
            width: `${getPercentage(values[1]) - getPercentage(values[0])}%`,
          }}
        />
        {[0, 1].map((index) => (
          <div
            key={index}
            className={`
              absolute top-1/2 -translate-y-1/2 -ml-2 w-4 h-4
              bg-black border-2 border-white rounded-full
              shadow-sm flex items-center justify-center
              ${disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}
              ${thumbClassName}
            `}
            style={{ left: `${getPercentage(values[index])}%` }}
            onMouseDown={(e) => handleMouseDown(index, e)}
            onTouchStart={(e) => handleMouseDown(index, e)}
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  label: PropTypes.string,
  showValues: PropTypes.bool,
  formatValue: PropTypes.func,
  className: PropTypes.string,
  trackClassName: PropTypes.string,
  thumbClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Slider;
