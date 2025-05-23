import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  type = 'button', 
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors duration-200 focus:outline-none';
  
  const variants = {
    primary: 'bg-[#00aaff] text-white hover:bg-[#0099ee] border border-[#00aaff] shadow-[0px_0px_14px_rgba(92,92,92,0.15)]',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    gradient: 'bg-gradient-to-b from-[#a028ff] to-[#6000ac] text-white hover:from-[#9020f0] hover:to-[#5500a0]',
    tag: 'bg-[#afd8ff] text-black rounded-[10px]'
  };
  
  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
    custom: ''
  };
  
  const buttonClasses = `
    ${baseClasses} 
    ${variants[variant] || variants.primary} 
    ${sizes[size] || sizes.medium} 
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
    ${className}
  `;
  
  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled} 
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'gradient', 'tag']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'custom']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string
};

export default Button;