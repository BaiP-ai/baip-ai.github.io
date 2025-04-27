import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * A loader component that provides feedback while waiting for Spline scenes to load
 */
const SplineLoader = ({ isVisible, progress = 0 }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  
  useEffect(() => {
    // Animate progress for smoother UX
    const interval = setInterval(() => {
      setDisplayProgress(current => {
        // Move the displayed progress toward actual progress
        if (current < progress) {
          return Math.min(current + 1, progress);
        }
        return current;
      });
    }, 20);
    
    return () => clearInterval(interval);
  }, [progress]);
  
  if (!isVisible) return null;
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-sky-50 bg-opacity-80 backdrop-blur-sm z-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-32 h-32 relative"
      >
        {/* Outer circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="6"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={283} // 2 * PI * r
            strokeDashoffset={283 - (283 * displayProgress) / 100}
            transform="rotate(-90 50 50)"
          />
        </svg>
        
        {/* Inner animation */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-16 h-16 relative">
            <motion.div 
              className="absolute w-4 h-4 bg-orange-500 rounded-full"
              style={{ top: '0', left: '50%', marginLeft: '-8px' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div 
              className="absolute w-3 h-3 bg-sky-600 rounded-full"
              style={{ bottom: '0', right: '25%' }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div 
              className="absolute w-3 h-3 bg-sky-400 rounded-full"
              style={{ bottom: '0', left: '25%' }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
            />
          </div>
        </motion.div>
      </motion.div>
      
      <div className="mt-4 text-sky-800 font-medium text-center">
        <p>Loading 3D Scene</p>
        <p className="text-sm text-sky-600">{displayProgress}%</p>
      </div>
    </div>
  );
};

export default SplineLoader;
