import { createSignal, onMount } from 'solid-js';

const ServicesTimeline = () => {
  const [activePhase, setActivePhase] = createSignal("Phase 1");
  
  onMount(() => {
    console.log("ServicesTimeline mounted");
  });

  const services = [
    {
      id: "phase1",
      phase: "Phase 1",
      title: "AI Products – Global Education",
      description: "Our first product supports agencies helping students apply to universities abroad. This AI-driven platform automates and optimizes the entire application journey.",
      points: [
        "Eligibility checks and document preparation",
        "Deadline tracking and application management",
        "Personalized insights and recommendations"
      ],
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    },
    {
      id: "phase2",
      phase: "Phase 2",
      title: "AI Services – Enterprise Solutions",
      description: "We consult with Fortune 500 companies to help them train, optimize, and align internal AI platforms for maximum business impact.",
      points: [
        "Answer business questions using internal data",
        "Create custom GPTs and copilots",
        "Align AI investments with business outcomes"
      ],
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    },
    {
      id: "future",
      phase: "Future",
      title: "Responsible AI Ecosystem",
      description: "Our vision is to build a comprehensive ecosystem of responsible AI products and services that work together to solve complex problems across industries.",
      points: [
        "Industry-specific AI solutions",
        "AI governance and compliance tools",
        "Open-source contributions"
      ],
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    }
  ];

  return (
    <div class="max-w-5xl mx-auto">
      {/* Timeline navigation header - Removed the horizontal line completely */}
      <div class="mb-16 relative">
        {/* Timeline points - evenly spaced */}
        <div class="relative z-10 flex justify-between items-center">
          {services.map((service, index) => (
            <div class="flex flex-col items-center">
              <button 
                onClick={() => setActivePhase(service.phase)}
                class={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                  activePhase() === service.phase 
                    ? 'bg-blue-500 shadow-lg shadow-blue-500/40' 
                    : 'bg-gray-500/50'
                }`}
              >
                <span class="font-bold text-white text-xl">{index + 1}</span>
              </button>
              <span class={`text-white/80 text-sm transition-colors duration-300 ${
                activePhase() === service.phase ? 'text-white' : ''
              }`}>
                {service.phase}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content panels */}
      <div class="mt-8">
        {services.map((service) => (
          <div 
            key={service.id} 
            style={{display: activePhase() === service.phase ? 'block' : 'none'}}
          >
            <div class="bg-slate-800/50 backdrop-blur-md rounded-xl p-8 border border-blue-500/20 shadow-lg">
              <div class="flex items-start mb-6">
                <div class="bg-blue-500 rounded-lg p-3 mr-5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={service.icon} />
                  </svg>
                </div>
                
                <div>
                  <span class="bg-blue-500 text-white text-sm px-3 py-1 rounded-full inline-block mb-2">
                    {service.phase}
                  </span>
                  <h3 class="text-2xl text-white font-bold font-display mb-2">{service.title}</h3>
                  <p class="text-white/80 mb-6 max-w-3xl">
                    {service.description}
                  </p>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.points.map((point, i) => (
                  <div key={i} class="bg-slate-700/40 backdrop-blur-md rounded-lg p-4 border border-blue-500/10">
                    <div class="flex items-start">
                      <div class="bg-blue-500 rounded-full flex items-center justify-center p-1.5 mr-3 flex-shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p class="text-white/90 text-sm">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesTimeline;
