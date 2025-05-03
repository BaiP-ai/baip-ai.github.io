import { Motion } from '@motionone/solid';

const RoadmapTimeline = () => {
  const milestones = [
    {
      title: "Launchpad Product",
      description: "Our AI-driven platform for global education agencies",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      color: "from-blue-600 to-blue-400",
      complete: true
    },
    {
      title: "Fortune 500 Services",
      description: "Strategic AI consulting for enterprise clients",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: "from-primary to-indigo-500",
      complete: false,
      current: true
    },
    {
      title: "Responsible AI Ecosystem",
      description: "Building a comprehensive suite of ethical AI products",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "from-teal-500 to-green-400",
      complete: false
    }
  ];
  
  return (
    <div class="max-w-4xl mx-auto">
      <Motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        class="relative pt-4 pb-20"
      >
        {/* Connecting line */}
        <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 via-primary to-teal-500 top-0"></div>
        
        {/* Milestones */}
        <div class="space-y-24">
          {milestones.map((milestone, index) => (
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              class="relative"
            >
              {/* Milestone dot */}
              <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class={`w-8 h-8 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-lg z-10 ${milestone.current ? 'ring-2 ring-white ring-offset-2 ring-offset-dark' : ''}`}>
                  {milestone.icon}
                </div>
              </div>
              
              {/* Content */}
              <div class={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                <div class="md:w-1/2 py-6 px-8">
                  <div class={`glass-panel p-5 md:p-6 ${milestone.complete ? 'border border-blue-500/30' : milestone.current ? 'border border-primary/30' : 'border-dashed border-white/10'}`}>
                    <h3 class={`text-xl font-display font-bold mb-2 ${milestone.complete ? 'text-blue-400' : milestone.current ? 'text-primary' : 'text-light/60'}`}>
                      {milestone.title}
                    </h3>
                    <p class={`${milestone.complete || milestone.current ? 'text-light/80' : 'text-light/50'}`}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
                <div class="md:w-1/2"></div>
              </div>
            </Motion.div>
          ))}
        </div>
      </Motion.div>
    </div>
  );
};

export default RoadmapTimeline;
