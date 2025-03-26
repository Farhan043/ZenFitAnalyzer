import React, { useEffect, useState } from 'react';
import SetTarget from '../Components/ActivityTracker/SetTarget';
import Progress from '../Components/ActivityTracker/Progress';
import Latest from '../Components/ActivityTracker/Latest';
import { motion } from 'framer-motion';

const ActivityTracker = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 sm:p-6 md:p-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <SetTarget />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
          >
            <Progress />
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10"
          >
            <Latest />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityTracker;



