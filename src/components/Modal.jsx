import { Motion, Presence } from '@motionone/solid';
import { Portal } from 'solid-js/web';
import { createEffect, onCleanup } from 'solid-js';

const Modal = (props) => {
  // Close modal on Escape key press
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && props.isOpen) {
      props.onClose();
    }
  };

  createEffect(() => {
    if (props.isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = ''; // Restore background scrolling
    }
    onCleanup(() => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = ''; // Ensure cleanup on component unmount
    });
  });

  return (
    <Portal>
      <Presence>
        {props.isOpen && (
          <Motion.div
            class="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overlay */}
            <div
              class="absolute inset-0 bg-dark/80 backdrop-blur-sm"
              onClick={props.onClose} // Close on overlay click
            />

            {/* Modal Content */}
            <Motion.div
              class="relative z-10 glass-panel-dark w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8" // Use dark panel for contrast
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {/* Close Button */}
              <button
                onClick={props.onClose}
                class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-light/60 hover:text-light transition-colors z-20"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Render children (the form) */}
              {props.children}
            </Motion.div>
          </Motion.div>
        )}
      </Presence>
    </Portal>
  );
};

export default Modal;
