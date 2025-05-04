import { createSignal, onMount } from 'solid-js';

// Function to dispatch a custom event to open the modal
const openContactModal = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'));
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = createSignal(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = createSignal(false);
  
  onMount(() => {
    let ticking = false;
    
    const handleScroll = () => {
      // Check if we're at the top
      const isAtTop = window.scrollY < 20;
      
      if (isAtTop) {
        // At the top: not scrolled styling
        setIsScrolled(false);
      } else {
        // Scrolled down: scrolled styling
        setIsScrolled(true);
      }
    };
    
    // Use requestAnimationFrame for better performance
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Initial check for page load with scroll already happened
    handleScroll();
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  const toggleMobileMenu = (isOpen) => {
    setIsMobileMenuOpen(isOpen);
  };

  return (
    <header
      class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled() ? 'py-2 bg-light/90 backdrop-blur-md shadow-sm border-b border-gray-200/50' : 'py-4 bg-light shadow-sm'
      }`}
    >
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between">
          <a href="/" class="flex items-center">
            <img src="/images/ai-logo.svg" alt="BaiP AI Logo" class="h-10 mr-3" />
            <span class={`text-2xl font-display font-bold bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent`}>BaiP</span>
          </a>

          <nav class="hidden md:flex space-x-8 items-center">
            <a href="#about" class={`font-medium transition-colors text-gray-700 hover:text-primary`}>About</a>
            <a href="#services" class={`font-medium transition-colors text-gray-700 hover:text-primary`}>Services</a>
            <a href="#approach" class={`font-medium transition-colors text-gray-700 hover:text-primary`}>Approach</a>
            <button onClick={openContactModal} class={`cta-button`}>Contact Us</button>
          </nav>

          <button
            onClick={() => toggleMobileMenu(!isMobileMenuOpen())}
            class={`md:hidden p-2 transition-colors text-gray-700`}
            aria-label="Toggle menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </div>

      <div
        class={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ease-in-out overflow-hidden bg-light shadow-lg border-t border-gray-200/50`}
      >
        <nav class="flex flex-col px-4 py-2 space-y-2">
          <a href="#about" onClick={() => toggleMobileMenu(false)} class={`block py-2 font-medium transition-colors text-gray-700 hover:text-primary`}>About</a>
          <a href="#services" onClick={() => toggleMobileMenu(false)} class={`block py-2 font-medium transition-colors text-gray-700 hover:text-primary`}>Services</a>
          <a href="#approach" onClick={() => toggleMobileMenu(false)} class={`block py-2 font-medium transition-colors text-gray-700 hover:text-primary`}>Approach</a>
          <button 
            onClick={() => {
              openContactModal();
              toggleMobileMenu(false); // Close menu after clicking
            }} 
            class={`block py-2 cta-button w-full text-center`}
          >
            Contact Us
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
