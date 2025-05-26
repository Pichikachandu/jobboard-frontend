import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Construction, ArrowRight, Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from './Header';

const UnderDevelopment = ({ pageName = 'Page' }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        return newProgress > 85 ? 85 : newProgress;
      });
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="relative
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-600 before:to-purple-600 before:opacity-90
            h-2 w-full"
          ></div>
          
          <div className="p-8 sm:p-12">
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 mb-6"
              >
                <Construction className="h-10 w-10 text-indigo-600" />
              </motion.div>
              
              <motion.h1 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4"
              >
                {pageName} is Coming Soon
              </motion.h1>
              
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                We're crafting something extraordinary for you. Stay tuned for an enhanced experience that will transform the way you interact with our platform.
              </motion.p>
            </div>
          
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-10 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100"
            >
              <div className="flex flex-col sm:flex-row items-start">
                <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6">
                  <h3 className="text-xl font-semibold text-gray-900">Development in Progress</h3>
                  <div className="mt-2 text-gray-600">
                    <p>Our team is working diligently to bring you a seamless and powerful experience. We're implementing cutting-edge features to enhance your workflow.</p>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
                      <span>Development Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div 
                        className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                    <p className="mt-3 text-sm text-gray-500">
                      Estimated completion: <span className="font-medium">Q3 2025</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/"
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:shadow-xl"
                >
                  <span>Back to Home</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="mailto:support@cybermindworks.com"
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl border-2 border-gray-200 bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:shadow-lg"
                >
                  <Mail className="mr-2 h-5 w-5 text-indigo-600 group-hover:animate-pulse" />
                  <span>Get Notified</span>
                  <ArrowUpRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              </motion.div>
            </motion.div>
          
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-16 pt-8 border-t border-gray-200"
            >
              <p className="text-sm text-center text-gray-500">
                Need immediate assistance?{' '}
                <a 
                  href="mailto:support@cybermindworks.com" 
                  className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200 hover:underline"
                >
                  support@cybermindworks.com
                </a>
                {' '}or call us at{' '}
                <a 
                  href="tel:+15551234567" 
                  className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200 hover:underline"
                >
                  +1 (555) 123-4567
                </a>
              </p>
              <p className="mt-2 text-xs text-center text-gray-400">
                Our support team is available 24/7 to assist you with any questions.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default UnderDevelopment;
