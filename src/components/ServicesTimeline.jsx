import { createSignal, createEffect } from 'solid-js';
import { Motion } from '@motionone/solid';

const ServicesTimeline = () => {
  const [activeTab, setActiveTab] = createSignal('services');
  const [contentHeight, setContentHeight] = createSignal('auto');
  const contentRefs = {};
  
  // Update height when tab changes to prevent content jumping
  createEffect(() => {
    const currentTab = activeTab();
    if (contentRefs[currentTab]) {
      setTimeout(() => {
        setContentHeight(`${contentRefs[currentTab].scrollHeight + 20}px`);
      }, 50);
    }
  });
  
  // Services data structure
  const servicesData = {
    products: {
      title: "Products",
      description: "Our flagship AI products are designed to streamline complex workflows, automate repetitive tasks, and provide actionable insights for your organization.",
      items: [
        {
          title: "University Admissions AI",
          description: "Smart document verification, fraud detection, and personalized insights for university application processing.",
          icon: "academic-cap"
        },
        {
          title: "Enterprise Assistant",
          description: "Custom AI agents that enhance decision-making by analyzing your company's unique data and processes.",
          icon: "lightbulb"
        },
        {
          title: "Document Intelligence",
          description: "Extract structured data from unstructured documents using our advanced NLP and computer vision models.",
          icon: "document"
        }
      ]
    },
    services: {
      title: "Services",
      description: "Custom AI systems for enterprises that enhance decision-making, automate workflows, and provide actionable insights from your data.",
      items: [
        {
          title: "Custom LLM Development",
          description: "Tailored large language models fine-tuned on your domain-specific data and optimized for your use cases.",
          icon: "code"
        },
        {
          title: "AI Strategy Consulting",
          description: "Expert guidance on AI implementation roadmaps, ethical frameworks, and organizational change management.",
          icon: "chart"
        },
        {
          title: "Integration Services",
          description: "Seamlessly connect our AI capabilities with your existing systems, databases, and workflows.",
          icon: "puzzle"
        }
      ]
    },
    research: {
      title: "Research",
      description: "Pushing the boundaries of AI capabilities through collaborative research initiatives, academic partnerships, and emerging technology exploration.",
      items: [
        {
          title: "Multimodal AI Systems",
          description: "Research on AI models that combine text, images, audio, and other data types for more comprehensive understanding.",
          icon: "beaker"
        },
        {
          title: "AI Governance Tools",
          description: "Developing frameworks and systems to ensure AI accountability, explainability, and regulatory compliance.",
          icon: "shield"
        },
        {
          title: "Industry Partnerships",
          description: "Collaborative research with academic institutions and industry partners to solve challenging AI problems.",
          icon: "users"
        }
      ]
    }
  };

  // Render the icon based on name
  const renderIcon = (iconName) => {
    const iconClasses = "h-6 w-6"; 
    
    switch (iconName) {
      case 'academic-cap':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" class={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
          </svg>
        );
      case 'lightbulb':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" class={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
        );
      case 'document':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" class={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        );
      case 'code':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" class={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" class={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125-1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        );
      case 'puzzle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" class={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.664v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
          </svg>
        );
      case 'beaker':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" class={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.309 48.309 0 01-8.135-1.587c-1.718-.293-2.3-2.379-1.067-3.611L5 14.5" />
          </svg>
        );
      case 'shield':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" class={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        );
      case 'users':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" class={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div class="max-w-6xl mx-auto">
      {/* Tab Navigation - Matches exactly the screenshot with dark background and blue/purple gradient highlight */}
      <div class="relative max-w-sm mx-auto mb-12">
        <div class="flex bg-[#1a1b26] rounded-full overflow-hidden p-1">
          {Object.entries(servicesData).map(([key, data]) => (
            <button 
              onClick={() => setActiveTab(key)}
              class={`relative flex-1 py-2.5 px-4 text-center text-base font-medium z-10 ${
                activeTab() === key ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
            >
              {data.title}
            </button>
          ))}
          
          {/* Sliding background pill that exactly matches the image */}
          <div 
            class="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-[#475AEF] to-[#8A4FFF] transition-all duration-300"
            style={{
              width: `${100 / Object.keys(servicesData).length - 2}%`,
              left: `${(Object.keys(servicesData).findIndex(k => k === activeTab()) * (100 / Object.keys(servicesData).length)) + 1}%`
            }}
          />
        </div>
      </div>
      
      {/* Tab Content Area */}
      <div 
        class="relative overflow-hidden transition-all duration-300"
        style={{ height: contentHeight() }}
      >
        {Object.entries(servicesData).map(([tab, data]) => (
          <Motion.div
            ref={el => contentRefs[tab] = el}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: activeTab() === tab ? 1 : 0,
              y: activeTab() === tab ? 0 : 20,
            }}
            transition={{ duration: 0.5 }}
            style={{
              position: activeTab() === tab ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              pointerEvents: activeTab() === tab ? 'auto' : 'none',
              zIndex: activeTab() === tab ? 1 : 0
            }}
          >
            {/* Title and description */}
            <div class="text-center mb-10">
              <h3 class="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {data.title}
              </h3>
              <p class="text-white/80 text-xl max-w-3xl mx-auto">
                {data.description}
              </p>
            </div>
            
            {/* Cards grid */}
            <div class="grid md:grid-cols-3 gap-6">
              {data.items.map((item, index) => (
                <Motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/30 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div class="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center mb-4">
                    {renderIcon(item.icon)}
                  </div>
                  <h4 class="text-xl font-display font-bold text-white mb-2">{item.title}</h4>
                  <p class="text-white/70 leading-relaxed">{item.description}</p>
                </Motion.div>
              ))}
            </div>
            
            {/* CTA Button - Updated to match the site's cta-button style */}
            <div class="mt-12 text-center">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                class="cta-button relative overflow-hidden group"
              >
                <span class="relative z-10">Learn More About Our {data.title}</span>
                <span class="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-25 transform translate-y-full group-hover:translate-y-0 transition-all duration-300"></span>
              </button>
            </div>
          </Motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicesTimeline;
