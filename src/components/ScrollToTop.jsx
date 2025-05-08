import { createSignal, onMount, onCleanup } from 'solid-js';
import { Motion } from '@motionone/solid';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = createSignal(false);
  
  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  onMount(() => {
    window.addEventListener('scroll', toggleVisibility);
    onCleanup(() => {
      window.removeEventListener('scroll', toggleVisibility);
    });
  });
  
  return (
    <Motion.button
      onClick={scrollToTop}
      class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-white hover:bg-primary transition-all"
      style={{ display: isVisible() ? 'flex' : 'none' }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isVisible() ? 1 : 0, scale: isVisible() ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </Motion.button>
  );
};

export default ScrollToTop;
