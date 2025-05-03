import { Motion } from '@motionone/solid';

const ServicesTimeline = () => {
  const services = [
    {
      phase: "Phase 1",
      title: "AI Products – Global Education",
      description: "Our first product supports agencies helping students apply to universities abroad. This AI-driven platform automates and optimizes the entire application journey.",
      points: [
        "Eligibility checks and document preparation",
        "Deadline tracking and application management",
        "Personalized insights and recommendations"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "primary",
      align: "left"
    },
    {
      phase: "Phase 2",
      title: "AI Services – Enterprise Solutions",
      description: "We consult with Fortune 500 companies to help them train, optimize, and align internal AI platforms for maximum business impact.",
      points: [
        "Answer business questions using internal data",
        "Create custom GPTs and copilots",
        "Align AI investments with business outcomes"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: "secondary",
      align: "right"
    },
    {
      phase: "Future",
      title: "Responsible AI Ecosystem",
      description: "Our vision is to build a comprehensive ecosystem of responsible AI products and services that work together to solve complex problems across industries.",
      points: [
        "Industry-specific AI solutions",
        "AI governance and compliance tools",
        "Open-source contributions"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "blue-400",
      align: "left",
      isFuture: true
    }
  ];

  return (
    <div class="relative max-w-4xl mx-auto perspective-container">
      {/* Center line - Gradient for dark background */}
      <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent"></div>

      {/* Timeline items */}
      <div class="space-y-12 md:space-y-16">
        {services.map((service, index) => (
          <div
            class={`timeline-item relative`}
          >
            {/* Reverted to animate trigger */}
            <Motion.div
              initial={{
                opacity: 0,
                x: service.align === 'left' ? -50 : 50,
              }}
              animate={{ // Use animate
                opacity: 1,
                x: 0,
              }}
              transition={{ duration: 0.7, delay: index * 0.2, easing: 'ease-out' }} // Keep stagger delay
              class={`flex flex-col ${service.align === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center preserve-3d`}
            >
              {/* Content Panel - Use glass-panel-dark */}
              <div class={`md:w-1/2 ${service.align === 'left' ? 'md:pr-12' : 'md:pl-12'} mb-6 md:mb-0 w-full`}>
                <div
                  class={`glass-panel-dark p-6 md:p-8 h-full ${service.isFuture ? 'border-dashed border-blue-400/50' : ''}`}
                >
                  <div class={`w-14 h-14 bg-${service.color}/10 rounded-xl flex items-center justify-center mb-5`}>
                    {service.icon}
                  </div>
                  {/* Refined text styles for better contrast and hierarchy */}
                  <h3 class={`text-xl md:text-2xl font-display font-semibold mb-3 text-light`}>{service.title}</h3>
                  <p class="text-light/75 text-base mb-5 leading-relaxed"> {/* Adjusted opacity and leading */}
                    {service.description}
                  </p>
                  <div class="space-y-2.5">
                    {service.points.map(point => (
                      <div class="flex items-start">
                        <span class={`text-${service.color} mr-2.5 mt-1 flex-shrink-0 text-lg`}>•</span> {/* Made bullet slightly larger */}
                        <span class={`text-sm ${service.isFuture ? 'text-light/50' : 'text-light/90'}`}>{point}</span> {/* Increased point brightness */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phase Marker */}
              {/* Reverted to animate trigger */}
              <Motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }} // Use animate
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2, type: 'spring', stiffness: 150 }}
                class={`md:w-1/2 ${service.align === 'left' ? 'md:pl-12' : 'md:pr-12'} flex justify-center w-full`}
              >
                <div
                  class={`w-24 h-24 rounded-full bg-${service.color} flex items-center justify-center z-10 shadow-lg shadow-${service.color}/30 
                          ${service.isFuture ? `bg-${service.color}/70 border border-${service.color}/40 shadow-${service.color}/20` : ''}`}
                >
                  <span class={`font-display font-bold text-lg ${service.isFuture ? `text-${service.color}-100` : 'text-white'}`}>{service.phase}</span>
                </div>
              </Motion.div>
            </Motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesTimeline;
