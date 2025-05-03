import { Motion } from '@motionone/solid';
import ThreeDGlobe from './3DGlobe';

const WhyBaiP = () => {
  const features = [
    {
      title: "Human-Centered Design",
      description: "We prioritize usability and positive real-world impact in every solution we build.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Scalable Architecture",
      description: "Our solutions grow with your business, adapting to increasing demands and complexity.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Global Perspective",
      description: "We support clients across industries and geographies with culturally-aware solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div class="max-w-6xl mx-auto">
      <div class="grid md:grid-cols-2 gap-12 items-center mb-12">
        <div>
          <p class="text-xl text-light/80 mb-8">
            At BaiP, we combine technical excellence with a deep understanding of business needs to create AI solutions that make a genuine difference.
          </p>
          
          <div class="space-y-8">
            {features.map((feature, index) => (
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                class="flex items-start"
              >
                <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <div class="text-primary">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-display font-bold mb-2">{feature.title}</h3>
                  <p class="text-light/70">{feature.description}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
        
        <Motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          class="glass-panel p-4 aspect-square rounded-full overflow-hidden relative mx-auto w-full max-w-md h-auto"
        >
          <ThreeDGlobe />
        </Motion.div>
      </div>
      
      <Motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        class="text-center"
      >
        <a href="#contact" class="cta-button">
          Join Our Journey
        </a>
      </Motion.div>
    </div>
  );
};

export default WhyBaiP;
