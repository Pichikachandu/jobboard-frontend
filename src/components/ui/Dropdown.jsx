import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  name,
  id,
  className = '',
  dropdownClassName = '',
  disabled = false,
  required = false,
  icon,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const dropdownRef = useRef(null);

  const handleFocus = (e) => {
    setHasFocus(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    // Check if the new focus target is outside our component
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setHasFocus(false);
      if (onBlur) onBlur(e);
    }
  };

  const selectedOption = options.find(option => option.value === value);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`
          flex items-center justify-between w-full px-4 py-2
          bg-white border ${hasFocus ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'} rounded-md shadow-sm
          cursor-pointer select-none
          ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'hover:border-gray-400'}
        `}
        onClick={toggleDropdown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={disabled ? -1 : 0}
        {...props}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <span className={`${!selectedOption ? 'text-gray-500' : ''}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      
      {isOpen && (
        <div className={`
          absolute z-10 w-full mt-1 bg-white border border-gray-300 
          rounded-md shadow-lg max-h-60 overflow-auto
          ${dropdownClassName}
        `}>
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                className={`
                  px-4 py-2 cursor-pointer hover:bg-gray-100
                  ${option.value === value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                `}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  dropdownClassName: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  icon: PropTypes.node
};

export default Dropdown;