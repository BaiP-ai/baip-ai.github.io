import React, { Suspense, useState, useEffect, useRef } from 'react';
import SplineLoader from './SplineLoader';

/**
 * Enhanced Spline component with better error handling, loading states,
 * and performance optimizations
 */
const EnhancedSplineComponent = ({ fallback, scene, onLoad }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [SplineModule, setSplineModule] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const splineRef = useRef(null);
  const timeoutRef = useRef(null);

  // Track loading time for fallback decision
  useEffect(() => {
    // Set a timeout to show fallback if loading takes too long
    timeoutRef.current = setTimeout(() => {
      if (!isLoaded && !hasError) {
        console.warn('Spline scene taking too long to load, showing fallback');
        setHasError(true);
        setErrorMessage('Scene loading timeout - using fallback visualization');
      }
    }, 15000); // 15 seconds timeout
    
    // Simulate progress as we don't have real progress events
    const progressInterval = setInterval(() => {
      if (!isLoaded && !hasError) {
        setLoadingProgress(prev => {
          // Gradually increase loading progress, but never reach 100% until actually loaded
          const increment = Math.random() * 2;
          return Math.min(prev + increment, 95);
        });
      }
    }, 300);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(progressInterval);
    };
  }, [isLoaded, hasError]);

  useEffect(() => {
    // Dynamically import Spline to handle errors gracefully
    import('@splinetool/react-spline')
      .then(module => {
        setSplineModule(module.default);
        setLoadingProgress(70); // Jump to 70% when module is loaded
      })
      .catch(error => {
        console.warn('Error loading Spline module:', error);
        setErrorMessage('Failed to load Spline module: ' + error.message);
        setHasError(true);
      });
  }, []);

  const handleSceneLoad = (spline) => {
    // Clear timeout since we've loaded successfully
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setIsLoaded(true);
    setLoadingProgress(100);
    
    // Store reference to spline object
    splineRef.current = spline;
    
    // Pass to parent if needed
    if (onLoad) {
      try {
        onLoad(spline);
      } catch (e) {
        console.warn('Error in onLoad callback:', e);
      }
    }

    // Apply performance optimizations
    try {
      if (spline && spline.runtime && spline.runtime.renderer) {
        // Adjust renderer settings for better performance
        spline.runtime.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio
        
        // Renderer quality adjustments based on device capability
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          spline.runtime.renderer.setSize(
            spline.runtime.renderer.domElement.clientWidth * 0.8,
            spline.runtime.renderer.domElement.clientHeight * 0.8
          );
        }
      }
    } catch (e) {
      console.warn('Failed to apply performance optimizations:', e);
    }
  };

  if (hasError) {
    return (
      <div className="relative w-full h-full">
        {fallback}
        {errorMessage && (
          <div className="absolute bottom-4 left-4 bg-red-900 bg-opacity-70 text-white p-2 rounded text-xs z-50">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }

  if (!SplineModule) {
    return (
      <div className="relative w-full h-full">
        <SplineLoader isVisible={true} progress={loadingProgress} />
        {fallback}
      </div>
    );
  }

  const Spline = SplineModule;
  
  return (
    <div className="spline-container w-full h-full relative">
      <SplineLoader isVisible={!isLoaded} progress={loadingProgress} />
      
      <Suspense fallback={<div className="w-full h-full">{fallback}</div>}>
        <Spline 
          scene={scene} 
          onLoad={handleSceneLoad}
          onError={(error) => {
            console.error('Spline scene error:', error);
            setErrorMessage('Failed to load Spline scene: ' + (error?.message || 'Unknown error'));
            setHasError(true);
          }}
        />
      </Suspense>
    </div>
  );
};

export default EnhancedSplineComponent;
