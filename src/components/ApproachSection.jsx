import { createSignal } from 'solid-js';
import { Motion, Presence } from '@motionone/solid';

const ApproachSection = () => {
  const [activeTab, setActiveTab] = createSignal('governance');

  const tabs = [
    { id: 'governance', label: 'Governance & Compliance', icon: 'shield' },
    { id: 'practices', label: 'Responsible AI Practices', icon: 'check' }
  ];

  const governanceItems = [
    { title: 'GDPR', description: 'We comply with the EU\'s General Data Protection Regulation to protect personal data' },
    { title: 'EU AI Act', description: 'We follow the latest guidelines for transparency, accountability, and safety in high-risk AI systems' },
    { title: 'SOC 2 (coming soon)', description: 'We are working toward SOC 2 compliance to reinforce trust in our infrastructure and data handling' }
  ];

  const practicesItems = [
    { title: 'Model Auditability', description: 'We maintain transparent records of model training and decision processes' },
    { title: 'Bias Reduction', description: 'Our AI systems are designed to minimize unfair bias in outputs and recommendations' },
    { title: 'Fairness Checks', description: 'Regular evaluations ensure our systems perform consistently across diverse user groups' }
  ];

  return (
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="section-heading">Our Approach: AI You Can Trust</h2>
        <p class="text-xl max-w-3xl mx-auto text-gray-600">
          We take data privacy, regulatory compliance, and ethical AI seriously.
        </p>
      </div>

      <div class="glass-panel p-8 max-w-5xl mx-auto perspective-container">
        {/* Tab navigation with enhanced styling */}
        <div class="flex flex-wrap justify-center gap-4 mb-8 relative z-10">
          {tabs.map(tab => (
            <button
              class={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                activeTab() === tab.id 
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg' 
                  : 'bg-white/20 shadow-sm hover:bg-white/30'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div class={`w-8 h-8 rounded-full flex items-center justify-center ${
                activeTab() === tab.id ? 'bg-white/20' : 'bg-primary/10'
              }`}>
                {tab.icon === 'shield' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                )}
              </div>
              <span class="font-display font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        <div class="relative min-h-[250px] mb-8">
          <Presence exitBeforeEnter>
            {activeTab() === 'governance' && (
              <Motion.div
                key="governance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                class="absolute inset-0 grid md:grid-cols-3 gap-6"
              >
                {governanceItems.map((item, index) => (
                  <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    class="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-primary/10 shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div class="flex items-center mb-4">
                      <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shadow-md mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <h3 class="text-xl font-display font-bold text-gray-800">{item.title}</h3>
                    </div>
                    <p class="text-gray-600">{item.description}</p>
                  </Motion.div>
                ))}
              </Motion.div>
            )}
          </Presence>

          <Presence exitBeforeEnter>
            {activeTab() === 'practices' && (
              <Motion.div
                key="practices"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                class="absolute inset-0 grid md:grid-cols-3 gap-6"
              >
                {practicesItems.map((item, index) => (
                  <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    class="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-secondary/10 shadow-lg hover:shadow-secondary/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div class="flex items-center mb-4">
                      <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-purple-400 flex items-center justify-center shadow-md mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <h3 class="text-xl font-display font-bold text-gray-800">{item.title}</h3>
                    </div>
                    <p class="text-gray-600">{item.description}</p>
                  </Motion.div>
                ))}
              </Motion.div>
            )}
          </Presence>
        </div>

        <div class="mt-12 pt-8 border-t border-white/10 relative">
          <div class="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div class="flex items-center justify-center">
            <a href="#contact-trigger" class="group bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-full text-white font-display font-medium shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Responsible AI Solutions</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproachSection;
