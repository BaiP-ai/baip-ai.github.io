import { createSignal } from 'solid-js';
import ThreeDGlobe from './3DGlobe';

const WhyBaiP = () => {
  const [activeFeature, setActiveFeature] = createSignal(0);
  const [isLoaded, setIsLoaded] = createSignal(false);
  
  // Make sure the component marks itself as loaded
  setTimeout(() => setIsLoaded(true), 100);

  const features = [
    {
      title: "Human-Centered Design",
      description: "We prioritize usability and positive real-world impact in every solution we build.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      highlights: ["User experience first", "Accessible interfaces", "Meaningful interactions"]
    },
    {
      title: "Scalable Architecture",
      description: "Our solutions grow with your business, adapting to increasing demands and complexity.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      highlights: ["Modular components", "Horizontal scaling", "Future-proofed design"]
    },
    {
      title: "Global Perspective",
      description: "We support clients across industries and geographies with culturally-aware solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      highlights: ["Multi-language support", "Culture-aware AI", "Localized solutions"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Debug */}
      {console.log("WhyBaiP rendering, activeFeature:", activeFeature(), "isLoaded:", isLoaded())}

      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <p className="text-xl text-light/80 mb-8">
            At BaiP, we combine technical excellence with a deep understanding of business needs to create AI solutions that make a genuine difference.
          </p>
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl transition-all duration-300 cursor-pointer border-l-4 ${
                  activeFeature() === index 
                    ? 'bg-white/10 border-primary shadow-lg' 
                    : 'hover:bg-white/5 border-transparent'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-lg ${
                    activeFeature() === index 
                      ? 'bg-primary text-white'
                      : 'bg-primary/20 text-primary'
                    } flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold mb-1 text-light">{feature.title}</h3>
                    <p className={`${
                      activeFeature() === index ? 'text-light/90' : 'text-light/70'
                    } transition-all duration-300`}>
                      {feature.description}
                    </p>
                    
                    {/* Feature highlights */}
                    {activeFeature() === index && (
                      <ul className="mt-3 space-y-1">
                        {feature.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center text-sm text-primary">
                            <span className="mr-2">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Increased height from h-[500px] to h-[600px] and adjusted other properties for better presentation */}
        <div className="glass-panel-dark p-0 overflow-hidden relative mx-auto w-full h-[600px] rounded-3xl border border-primary/20 shadow-xl">
          {/* Increased opacity for better visibility */}
          <div className="absolute inset-0 opacity-100">
            {isLoaded() && <ThreeDGlobe activeFeature={activeFeature()} />}
          </div>
          
          {/* Moved label position for better visibility with the larger globe */}
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-8">
            <div className="text-center px-8 py-4 rounded-full bg-dark/80 backdrop-blur-md border border-white/10 shadow-lg">
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent">
                {activeFeature() === 0 ? 'Human-First Technology' : 
                 activeFeature() === 1 ? 'Built To Scale' : 'Global Solutions'}
              </span>
            </div>
          </div>
          
          {/* Feature indicators - moved positions to accommodate larger globe */}
          <div className="absolute inset-0">
            {activeFeature() === 0 && (
              <div className="absolute top-1/4 left-1/4 w-8 h-8">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </div>
            )}
            
            {activeFeature() === 1 && (
              <div className="absolute bottom-1/3 right-1/3 w-8 h-8">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
              </div>
            )}
            
            {activeFeature() === 2 && (
              <>
                <div className="absolute top-1/3 right-1/4 w-8 h-8">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-400"></span>
                </div>
                <div className="absolute bottom-1/4 left-1/3 w-8 h-8">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-400"></span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <a href="#contact-trigger" className="cta-button">
          <span className="relative z-10">Join Our Journey</span>
        </a>
      </div>
      
      {/* Fallback content in case the component doesn't render properly */}
      {!isLoaded() && (
        <div className="p-12 text-center mt-8">
          <div className="glass-panel-dark p-8">
            <h3 className="text-light font-display text-xl">Loading BaiP features...</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhyBaiP;
