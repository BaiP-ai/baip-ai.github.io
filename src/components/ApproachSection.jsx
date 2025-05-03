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

      <div class="glass-panel p-8 max-w-5xl mx-auto">
        <div class="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map(tab => (
            <button
              class={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${activeTab() === tab.id ? 'bg-primary text-white' : 'bg-white/5 hover:bg-white/10'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon === 'shield' ? (
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              )}
              {tab.label}
            </button>
          ))}
        </div>

        <div class="relative min-h-[200px]">
          <Presence exitBeforeEnter>
            {activeTab() === 'governance' && (
              <Motion.div
                key="governance"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                class="absolute inset-0 grid md:grid-cols-3 gap-6"
              >
                {governanceItems.map((item) => (
                  <div
                    class="bg-gray-200/50 p-6 rounded-xl hover:bg-gray-200/70 transition-colors"
                  >
                    <h3 class="text-lg md:text-xl font-display font-semibold mb-3 text-dark">{item.title}</h3>
                    <p class="text-gray-700 text-sm">{item.description}</p>
                  </div>
                ))}
              </Motion.div>
            )}
          </Presence>

          <Presence exitBeforeEnter>
            {activeTab() === 'practices' && (
              <Motion.div
                key="practices"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                class="absolute inset-0 grid md:grid-cols-3 gap-6"
              >
                {practicesItems.map((item) => (
                  <div
                    class="bg-gray-200/50 p-6 rounded-xl hover:bg-gray-200/70 transition-colors"
                  >
                    <h3 class="text-lg md:text-xl font-display font-semibold mb-3 text-dark">{item.title}</h3>
                    <p class="text-gray-700 text-sm">{item.description}</p>
                  </div>
                ))}
              </Motion.div>
            )}
          </Presence>
        </div>

        <div class="mt-12 border-t border-white/10 pt-8 flex items-center justify-center">
          <div class="flex items-center gap-3 bg-primary px-6 py-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="font-display font-semibold text-white">Committed to Responsible AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproachSection;
