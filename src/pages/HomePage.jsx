import React, { Suspense, useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaGlobe, FaArrowDown } from 'react-icons/fa';

// Conditionally import Spline to handle cases where it fails to load
const SplineComponent = ({ fallback, scene, onLoad }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [SplineModule, setSplineModule] = useState(null);

  useEffect(() => {
    // Dynamically import Spline to handle errors gracefully
    import('@splinetool/react-spline')
      .then(module => {
        setSplineModule(module.default);
      })
      .catch(error => {
        console.warn('Error loading Spline module:', error);
        setErrorMessage('Failed to load Spline module: ' + error.message);
        setHasError(true);
      });
  }, []);

  if (hasError || !SplineModule) {
    return (
      <div>
        {fallback}
        {errorMessage && (
          <div className="absolute bottom-4 left-4 bg-red-900 bg-opacity-70 text-white p-2 rounded text-xs z-50">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }

  const Spline = SplineModule;
  
  return (
    <Suspense fallback={fallback}>
      <Spline 
        scene={scene} 
        onLoad={onLoad}
        onError={(error) => {
          console.error('Spline scene error:', error);
          setErrorMessage('Failed to load Spline scene: ' + (error?.message || 'Access Denied'));
          setHasError(true);
        }}
      />
    </Suspense>
  );
};

// Neural network fallback animation
const NeuralNetworkFallback = () => {
  return (
    <div className="w-full h-full bg-gray-900 overflow-hidden relative">
      {/* Animated nodes */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15],
            opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.1],
            scale: [1, Math.random() * 0.5 + 0.8],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      
      {/* Animated connections */}
      <svg className="absolute inset-0 w-full h-full z-0">
        <motion.path
          d="M100,250 C150,100 350,100 400,250"
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="1"
          fill="transparent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M200,350 C250,200 300,200 350,350"
          stroke="rgba(99, 102, 241, 0.3)"
          strokeWidth="1"
          fill="transparent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />
        <motion.path
          d="M50,180 C150,150 250,150 450,180"
          stroke="rgba(147, 197, 253, 0.3)"
          strokeWidth="1"
          fill="transparent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        />
      </svg>
    </div>
  );
};

// AI modules fallback visualization
const AIModulesFallback = () => {
  return (
    <div className="w-full h-full bg-gray-800 overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64">
          <motion.div 
            className="absolute w-32 h-32 bg-blue-600 rounded-xl bg-opacity-20 backdrop-blur-sm"
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1],
            }} 
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
            }}
            style={{ left: '0', top: '10%' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-blue-300 font-mono text-sm">Education AI</div>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute w-40 h-40 bg-indigo-600 rounded-xl bg-opacity-20 backdrop-blur-sm"
            animate={{ 
              rotate: -360,
              scale: [1, 1.1, 1],
            }} 
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }
            }}
            style={{ right: '0', bottom: '10%' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-indigo-300 font-mono text-sm">Enterprise AI</div>
            </div>
          </motion.div>
          
          <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <motion.path
              d="M30,40 C40,20 60,20 70,40"
              stroke="rgba(147, 197, 253, 0.3)"
              strokeWidth="0.5"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.svg>
        </div>
      </div>
    </div>
  );
};

// Data flow fallback visualization
const DataFlowFallback = () => {
  return (
    <div className="w-full h-full overflow-hidden relative bg-gradient-to-br from-blue-900 to-gray-900">
      <div className="absolute inset-0">
        {/* Data flow lines */}
        <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1000 1000">
          <motion.path
            d="M200,200 C300,100 700,100 800,200 S900,400 800,500 S500,600 200,500 S100,300 200,200"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="2"
            fill="transparent"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M300,300 C400,200 600,200 700,300 S800,500 700,600 S400,700 300,600 S200,400 300,300"
            stroke="rgba(99, 102, 241, 0.2)"
            strokeWidth="2"
            fill="transparent"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1 }}
          />
        </svg>
        
        {/* Data nodes */}
        <motion.div
          className="absolute w-16 h-16 bg-blue-500 rounded-full bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
          style={{ left: '20%', top: '30%' }}
          animate={{ 
            scale: [1, 1.2, 1],
            boxShadow: [
              '0 0 0 rgba(59, 130, 246, 0.4)',
              '0 0 20px rgba(59, 130, 246, 0.6)',
              '0 0 0 rgba(59, 130, 246, 0.4)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-white text-xs">Privacy</span>
        </motion.div>
        
        <motion.div
          className="absolute w-16 h-16 bg-indigo-500 rounded-full bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
          style={{ right: '20%', top: '40%' }}
          animate={{ 
            scale: [1, 1.2, 1],
            boxShadow: [
              '0 0 0 rgba(99, 102, 241, 0.4)',
              '0 0 20px rgba(99, 102, 241, 0.6)',
              '0 0 0 rgba(99, 102, 241, 0.4)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <span className="text-white text-xs">Ethics</span>
        </motion.div>
        
        <motion.div
          className="absolute w-16 h-16 bg-purple-500 rounded-full bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
          style={{ left: '50%', bottom: '20%' }}
          animate={{ 
            scale: [1, 1.2, 1],
            boxShadow: [
              '0 0 0 rgba(139, 92, 246, 0.4)',
              '0 0 20px rgba(139, 92, 246, 0.6)',
              '0 0 0 rgba(139, 92, 246, 0.4)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        >
          <span className="text-white text-xs">Compliance</span>
        </motion.div>
      </div>
    </div>
  );
};

// Custom hook to manage Spline objects and interactions with fallbacks
const useSplineObject = () => {
  const [splineApp, setSplineApp] = useState(null);
  const objectsRef = useRef({});

  const handleLoad = (spline) => {
    if (spline) {
      setSplineApp(spline);
    }
  };

  const getObject = (name) => {
    if (!splineApp) return null;
    
    try {
      if (!objectsRef.current[name]) {
        objectsRef.current[name] = splineApp.findObjectByName(name);
      }
    } catch (e) {
      console.warn(`Error finding Spline object ${name}:`, e);
      return null;
    }
    
    return objectsRef.current[name];
  };

  const animateObject = (name, animationName) => {
    try {
      const object = getObject(name);
      if (object && object.emitEvent) {
        object.emitEvent(animationName);
      }
    } catch (e) {
      console.warn(`Error animating Spline object ${name}:`, e);
    }
  };

  const rotateObject = (name, x, y, z) => {
    try {
      const object = getObject(name);
      if (object && object.rotation) {
        if (x !== undefined) object.rotation.x = x;
        if (y !== undefined) object.rotation.y = y;
        if (z !== undefined) object.rotation.z = z;
      }
    } catch (e) {
      console.warn(`Error rotating Spline object ${name}:`, e);
    }
  };

  const moveObject = (name, x, y, z) => {
    try {
      const object = getObject(name);
      if (object && object.position) {
        if (x !== undefined) object.position.x = x;
        if (y !== undefined) object.position.y = y;
        if (z !== undefined) object.position.z = z;
      }
    } catch (e) {
      console.warn(`Error moving Spline object ${name}:`, e);
    }
  };

  return {
    splineApp,
    handleLoad,
    getObject,
    animateObject,
    rotateObject,
    moveObject
  };
};

// Section component for consistent spacing and structure
const Section = ({ id, className, children }) => {
  return (
    <section 
      id={id} 
      className={`relative min-h-screen w-full flex items-center overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
};

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);
  
  // References to Spline objects for each section
  const heroSpline = useSplineObject();
  const featuresSpline = useSplineObject();
  const approachSpline = useSplineObject();
  
  // Update the Spline scene to a different public one or switch to a local file
  // Option 1: Try one of these public Spline examples that should be accessible
  const publicDemoScene = "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"; 
  // or try "https://prod.spline.design/cTSoKL-VADsT9XZf/scene.splinecode"
  
  // Option 2: If you have your own Spline scene uploaded, use that URL instead
  // const publicDemoScene = "YOUR_SPLINE_SCENE_URL";
  
  // Option 3: Use a local file if you've downloaded a .splinecode file
  // const localDemoScene = "/your-local-scene.splinecode";
  
  // Scroll-based animations for the hero Spline scene
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      if (heroSpline.splineApp) {
        try {
          // Try to animate any available objects in the spline scene
          heroSpline.rotateObject('AI_Brain', undefined, value * Math.PI * 2, undefined);
          heroSpline.moveObject('Neural_Network', undefined, 2 + value * 3, undefined);
          
          if (value > 0.2 && value < 0.3) {
            heroSpline.animateObject('Data_Particles', 'pulse');
          }
        } catch (e) {
          // Silently fail if objects don't exist
        }
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, heroSpline]);

  return (
    <div className="bg-gray-900 text-white">
      {/* Fixed Header */}
      <motion.header
        style={{ opacity: headerOpacity, y: headerY }}
        className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-gray-900 to-transparent py-4"
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">BaiP</h1>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-blue-400 transition-colors">Services</a>
            <a href="#approach" className="hover:text-blue-400 transition-colors">Our Approach</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </nav>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">Schedule Demo</button>
        </div>
      </motion.header>

      {/* Hero Section with Neural Network 3D */}
      <Section id="hero" className="bg-gray-900">
        {/* 3D AI Brain Network Visualization */}
        <div className="absolute inset-0 w-full h-full z-0">
          <SplineComponent
            fallback={<NeuralNetworkFallback />}
            scene={publicDemoScene}
            onLoad={heroSpline.handleLoad}
          />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h1 className="text-6xl font-bold mb-4 leading-tight">
                AI That <span className="text-blue-500">Moves You</span> Forward
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Boston AI Partners builds transparent, ethical, and powerful AI solutions
                that turn complex challenges into opportunities.
              </p>
              <div className="flex space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-medium transition-all">
                  Our Services
                </button>
                <button className="bg-transparent border border-white hover:border-blue-500 hover:text-blue-500 px-8 py-3 rounded-full font-medium transition-all">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaArrowDown className="text-white opacity-70" />
          </motion.div>
        </div>
      </Section>

      {/* Features/Services Section with Interactive AI Modules */}
      <Section id="features" className="bg-gray-800">
        <div className="absolute right-0 top-0 w-1/2 h-full z-0">
          <SplineComponent
            fallback={<AIModulesFallback />}
            scene={publicDemoScene}
            onLoad={featuresSpline.handleLoad}
          />
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl font-bold mb-16 text-white">Our AI Solutions</h2>

            <div className="space-y-16">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gray-900 bg-opacity-70 backdrop-blur-md p-8 rounded-2xl"
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => {
                  try {
                    featuresSpline.animateObject('Education_Module', 'highlight');
                  } catch(e) {}
                }}
              >
                <div className="flex items-start">
                  <div className="mr-6 p-3 bg-blue-600 rounded-xl">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Global Education AI</h3>
                    <p className="text-gray-300">
                      Our flagship AI platform automates and optimizes the university application process
                      for international students—from eligibility checks to personalized insights.
                    </p>
                    <button 
                      className="mt-4 text-blue-400 hover:text-blue-300 flex items-center"
                      onClick={() => {
                        try {
                          featuresSpline.animateObject('Education_Module', 'highlight');
                        } catch(e) {}
                      }}
                    >
                      Explore Solution
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-900 bg-opacity-70 backdrop-blur-md p-8 rounded-2xl"
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => {
                  try {
                    featuresSpline.animateObject('Enterprise_Module', 'highlight');
                  } catch(e) {}
                }}
              >
                <div className="flex items-start">
                  <div className="mr-6 p-3 bg-indigo-600 rounded-xl">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Enterprise AI Solutions</h3>
                    <p className="text-gray-300">
                      We help Fortune 500 companies train, optimize, and align internal AI platforms
                      to extract insights from proprietary data and create custom AI assistants.
                    </p>
                    <button 
                      className="mt-4 text-indigo-400 hover:text-indigo-300 flex items-center"
                      onClick={() => {
                        try {
                          featuresSpline.animateObject('Enterprise_Module', 'highlight');
                        } catch(e) {}
                      }}
                    >
                      Explore Solution
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Our Approach Section with Data Flow Visualization */}
      <Section id="approach" className="bg-gradient-to-br from-blue-900 to-gray-900">
        <div className="absolute left-0 top-0 w-full h-full z-0 opacity-70">
          <SplineComponent
            fallback={<DataFlowFallback />}
            scene={publicDemoScene}
            onLoad={approachSpline.handleLoad}
          />
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold mb-6"
            >
              Our Approach: AI You Can Trust
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-blue-100"
            >
              We build AI that respects privacy, ensures transparency, and delivers real business outcomes.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-xl"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
              }}
              onHoverStart={() => {
                try {
                  approachSpline.animateObject('Compliance_Node', 'pulse');
                } catch(e) {}
              }}
            >
              <div className="h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Regulatory Compliance</h3>
              <p className="text-gray-300">
                We build systems that comply with GDPR, the EU AI Act, and work toward SOC 2 certification
                to ensure your data is handled with the highest standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-xl"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
              }}
              onHoverStart={() => {
                try {
                  approachSpline.animateObject('Data_Node', 'pulse');
                } catch(e) {}
              }}
            >
              <div className="h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Data Privacy</h3>
              <p className="text-gray-300">
                Your data stays yours. We implement strong encryption, secure processing pipelines,
                and transparent data handling practices in every solution.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-xl"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
              }}
              onHoverStart={() => {
                try {
                  approachSpline.animateObject('Ethics_Node', 'pulse');
                } catch(e) {}
              }}
            >
              <div className="h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Ethical AI</h3>
              <p className="text-gray-300">
                We integrate bias detection, fairness testing, and model explainability into our 
                AI development lifecycle to ensure responsible outcomes.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="bg-gray-900">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold mb-4">Let's Build the Future of AI—Together</h2>
                <p className="text-xl text-gray-300">
                  Are you a university agency, enterprise leader, or investor looking to harness AI responsibly?
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                      <input 
                        id="name" 
                        type="text" 
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                      <input 
                        id="email" 
                        type="email" 
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
                      <textarea 
                        id="message" 
                        rows="4" 
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all">
                      Send Message
                    </button>
                  </form>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Boston AI Partners</h3>
                    <p className="text-gray-300 mb-4">
                      Our mission is to make AI accessible, ethical, and impactful for organizations worldwide.
                    </p>
                    <div className="flex space-x-4 mt-6">
                      <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                        <FaLinkedin size={24} />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                        <FaTwitter size={24} />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                        <FaGlobe size={24} />
                      </a>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-4">Schedule a Demo</h4>
                    <p className="text-gray-300 mb-4">
                      See our AI solutions in action with a personalized demonstration.
                    </p>
                    <button className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-all">
                      Book Demo Session
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p>© 2025 Boston AI Partners. All rights reserved.</p>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;