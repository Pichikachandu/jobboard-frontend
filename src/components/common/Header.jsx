import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import CreateJobForm from '../jobs/CreateJobForm';
import { Menu, X } from 'lucide-react';
import Modal from '../../components/ui/Modal';

const Header = () => {
  const navigate = useNavigate();
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openCreateJob = () => {
    // If we're already on the jobs page, just open the modal
    if (window.location.pathname === '/jobs') {
      setIsCreateJobOpen(true);
    } else {
      // Otherwise, navigate to the jobs page with a query param
      navigate('/jobs?createJob=true');
    }
  };
  
  const closeCreateJob = () => {
    setIsCreateJobOpen(false);
    // Remove the query param when closing the modal
    if (window.location.search.includes('createJob=true')) {
      navigate('/jobs', { replace: true });
    }
  };
  
  // Check URL for createJob query param on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('createJob') === 'true') {
      setIsCreateJobOpen(true);
    }
  }, []);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/jobs", label: "Find Jobs" },
    { to: "/talents", label: "Find Talents" },
    { to: "/about", label: "About us" },
    { to: "/testimonials", label: "Testimonials" },
  ];

  const linkStyle = {
    fontFamily: 'Satoshi',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '100%',
    letterSpacing: '0%',
    color: '#303030',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '#a028ff'
    }
  };

  return (
    <header className="w-full flex justify-center py-4 bg-transparent"
    style={{ boxShadow: '0px 0px 20px 0px #7F7F7F26' }}>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-full px-4 md:px-8 py-4 flex items-center justify-between relative">
        {/* Logo and Title - Left */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <img 
              src="/images/img_clip_path_group.png" 
              alt="Logo" 
              className="w-9 h-9 md:w-11 md:h-11" 
            />
            <h1 className="ml-5 text-xl font-bold text-gray-800 md:hidden">CyberMind Works</h1>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden z-50">
          <button 
            onClick={toggleMenu}
            className="text-gray-700 hover:text-[#a028ff] focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-8 h-8 font-bold" strokeWidth={2.5} />
            ) : (
              <Menu className="w-8 h-8 font-bold" strokeWidth={2.5} />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-6 lg:space-x-12">
          {navLinks.map((link) => (
            <Link 
              key={link.to}
              to={link.to}
              style={linkStyle}
              className="hover:text-[#a028ff]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        {isMobile && (
          <div 
            className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform ${
              isMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
            style={{
              top: '80px',
              left: 0,
              right: 0,
              bottom: 0,
              padding: '2rem',
              opacity: isMenuOpen ? 1 : 0,
              pointerEvents: isMenuOpen ? 'auto' : 'none',
              zIndex: 40,
            }}
          >
            <div className="flex flex-col items-center space-y-8 w-full max-w-xs">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl font-medium text-gray-800 hover:text-[#a028ff] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <Button 
                onClick={() => {
                  openCreateJob();
                  setIsMenuOpen(false);
                }}
                className="text-white px-6 py-3 w-full max-w-xs font-semibold"
                style={{
                  background: 'linear-gradient(180deg, #A128FF 0%, #6100AD 113.79%)',
                  border: 'none',
                  borderRadius: '30px',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  maxWidth: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                Create Jobs
              </Button>
            </div>
          </div>
        )}

        {/* CTA Button - Right */}
        <div className="hidden md:block flex-none">
          <Button 
            onClick={openCreateJob}
            className="text-white px-6 py-3 font-semibold"
            style={{
              background: 'linear-gradient(180deg, #A128FF 0%, #6100AD 113.79%)',
              border: 'none',
              borderRadius: '30px',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '20px',
              transition: 'all 0.3s ease',
              minWidth: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'linear-gradient(180deg, #9118e6 0%, #51008f 113.79%)';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'linear-gradient(180deg, #A128FF 0%, #6100AD 113.79%)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.1)';
            }}
          >
            Create Jobs
          </Button>
        </div>
      </div>

      {/* Create Job Modal */}
      <Modal isOpen={isCreateJobOpen} onClose={closeCreateJob}>
        <CreateJobForm onClose={closeCreateJob} />
      </Modal>
    </header>
  );
};

export default Header;