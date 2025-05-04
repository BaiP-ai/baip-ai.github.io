import { createSignal } from 'solid-js';

const FAQSection = () => {
  // Track which FAQ item is currently open
  const [activeIndex, setActiveIndex] = createSignal(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex() === index ? null : index);
  };

  const faqs = [
    {
      question: "How does BaiP ensure AI solutions are ethical and unbiased?",
      answer: "We implement rigorous bias detection and mitigation procedures throughout our development process. All models undergo extensive testing against diverse datasets to identify and address potential fairness issues. We also follow established frameworks from organizations like the IEEE to ensure our AI solutions adhere to ethical standards."
    },
    {
      question: "What industries can benefit from BaiP's AI solutions?",
      answer: "Our AI solutions are adaptable across multiple sectors including higher education, corporate enterprises, healthcare, and financial services. We specialize in applications where responsible data handling, accurate predictions, and transparent decision-making are paramount to success."
    },
    {
      question: "How long does it take to implement a custom AI solution with BaiP?",
      answer: "Implementation timelines vary based on project complexity. Our education AI solutions can be deployed in 4-8 weeks, while enterprise solutions typically take 8-16 weeks from initial consultation to deployment. We prioritize thorough testing and validation to ensure reliable performance."
    },
    {
      question: "How does BaiP protect user data and ensure privacy?",
      answer: "Data privacy is central to our approach. We implement strong encryption, follow data minimization principles, and design systems with privacy-by-default. Our solutions comply with regulations like GDPR and CCPA, and we offer data processing agreements to ensure transparent handling of information."
    },
    {
      question: "What makes BaiP different from other AI solution providers?",
      answer: "Our key differentiators are our focus on responsible AI development, our specialized expertise in education and enterprise contexts, and our commitment to creating AI that's not just powerful but transparent and trustworthy. We don't just build technology; we build relationships based on shared values."
    }
  ];

  return (
    <div class="max-w-4xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-display font-bold mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center">
        Frequently Asked Questions
      </h2>
      
      <div class="space-y-6">
        {faqs.map((faq, index) => {
          const isActive = activeIndex() === index;
          
          return (
            <div 
              class={`bg-white rounded-xl overflow-hidden transition-all duration-300 border ${
                isActive 
                  ? 'border-primary/30 shadow-lg' 
                  : 'border-gray-100 shadow'
              }`}
              style={{ animation: `fadeIn 0.5s ease forwards ${index * 0.1}s`, opacity: "0" }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                class="w-full px-6 py-5 flex justify-between items-center focus:outline-none"
              >
                <h3 class="font-display font-bold text-lg md:text-xl text-left text-gray-800">
                  {faq.question}
                </h3>
                <div 
                  class={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary text-white rotate-45' 
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </button>
              
              <div 
                class="overflow-hidden transition-all duration-300"
                style={{
                  "max-height": isActive ? "500px" : "0px",
                  "opacity": isActive ? "1" : "0"
                }}
              >
                <div class={`p-6 border-t ${isActive ? 'border-primary/10' : 'border-gray-50'} bg-gray-50/50`}>
                  <p class="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div class="mt-16 text-center">
        <p class="text-gray-600 mb-6">
          Still have questions about how we can help your business?
        </p>
        <a 
          href="#contact-trigger" 
          class="cta-button inline-flex items-center group"
        >
          <span class="mr-2">Get in touch with our team</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default FAQSection;
