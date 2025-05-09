import { onMount } from 'solid-js';

const ContactForm = () => {
  onMount(() => {
    // Configure Freshdesk widget settings with blue theme instead of green
    window.fwSettings = {
      widget_id: 159000000026,
      // Hide the default launcher
      hide_chat_button: true,
      
      // Updated theme colors to blue/purple to match website
      widget_font_family: 'Lexend, sans-serif',
      widget_color_primary: '#2563EB', // Primary blue instead of green
      widget_color_secondary: '#7C3AED', // Purple accent
      widget_color_tertiary: '#60A5FA', // Light blue accent
      widget_color_bg: '#FFFFFF', // White background
      widget_color_text: '#333333', // Dark text
      widget_color_heading: '#FFFFFF', // White text for headings
      widget_border_radius: '8px', // Slightly rounded corners
      
      // Custom widget UI options with stronger overrides
      widget_custom_css: `
        /* Main wrapper */
        .fw-widget-wrapper {
          font-family: 'Lexend', 'Inter', sans-serif !important;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
        }
        
        /* Header - Blue gradient instead of green */
        .fw-widget-wrapper .fw-widget-header {
          background: linear-gradient(to right, #2563EB, #7C3AED) !important;
          border-bottom: none !important;
          padding: 16px 20px !important;
        }
        
        /* Header text */
        .fw-widget-wrapper .fw-widget-header h2 {
          font-size: 20px !important;
          font-weight: 500 !important;
          color: white !important;
        }
        
        /* Primary buttons - blue instead of green */
        .fw-widget-wrapper .fw-button-primary,
        .fw-widget-wrapper button[type="submit"],
        .fw-widget-wrapper .fw-widget-cta {
          background: linear-gradient(to right, #2563EB, #7C3AED) !important;
          border: none !important;
          color: white !important;
          box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2) !important;
        }
        
        /* Button hover state */
        .fw-widget-wrapper .fw-button-primary:hover,
        .fw-widget-wrapper button[type="submit"]:hover,
        .fw-widget-wrapper .fw-widget-cta:hover {
          background: linear-gradient(to right, #1E40AF, #6D28D9) !important;
          box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3) !important;
        }
        
        /* Form inputs */
        .fw-widget-wrapper input, 
        .fw-widget-wrapper textarea, 
        .fw-widget-wrapper select {
          border-radius: 6px !important;
          border: 1px solid #ddd !important;
          background: #fff !important;
          color: #333 !important;
          box-shadow: none !important;
          transition: border-color 0.2s ease !important;
        }
        
        /* Input focus state */
        .fw-widget-wrapper input:focus, 
        .fw-widget-wrapper textarea:focus, 
        .fw-widget-wrapper select:focus {
          border-color: #2563EB !important;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1) !important;
        }
        
        /* Labels */
        .fw-widget-wrapper label {
          color: #333 !important;
          font-weight: normal !important;
          font-size: 14px !important;
        }
        
        /* Close button */
        .fw-widget-wrapper .fw-close-button {
          color: #fff !important;
          opacity: 0.8 !important;
        }
        
        /* Close button hover */
        .fw-widget-wrapper .fw-close-button:hover {
          opacity: 1 !important;
        }
        
        /* Form labels */
        .fw-widget-wrapper .fw-form-labels {
          font-size: 14px !important;
          font-weight: 400 !important;
          color: #333 !important;
        }
        
        /* Select dropdown styling */
        .fw-widget-wrapper select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23333333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") !important;
          background-repeat: no-repeat !important;
          background-position: right 8px center !important;
          padding-right: 30px !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          appearance: none !important;
        }
        
        /* Dropdowns and other field styling */
        .fw-widget-wrapper .fw-dropdown,
        .fw-widget-wrapper .fw-fileupload {
          border-color: #ddd !important;
        }
        
        /* Radio and checkboxes - blue accent instead of green */
        .fw-widget-wrapper input[type="checkbox"]:checked,
        .fw-widget-wrapper input[type="radio"]:checked {
          background-color: #2563EB !important;
          border-color: #2563EB !important;
        }
        
        /* Footer area */
        .fw-widget-wrapper .fw-widget-footer {
          background-color: #f8fafc !important;
          border-top: 1px solid #eaeaea !important;
        }
        
        /* Links */
        .fw-widget-wrapper a {
          color: #2563EB !important;
        }
        
        /* Support menu icons - replace green with blue */
        .fw-widget-wrapper .fw-icon svg path {
          fill: #2563EB !important;
        }
        
        /* Chat message styling */
        .fw-widget-wrapper .fw-chat-message {
          background-color: #f0f7ff !important;
          border-color: #e0eeff !important;
        }
        
        /* Chat bubbles - user */
        .fw-widget-wrapper .fw-chat-user-bubble {
          background: linear-gradient(to right, #2563EB, #7C3AED) !important;
          color: white !important;
        }
        
        /* Chat bubbles - agent */
        .fw-widget-wrapper .fw-chat-agent-bubble {
          background-color: #f0f7ff !important;
          color: #333 !important;
        }
        
        /* Status messages */
        .fw-widget-wrapper .fw-status-message {
          background-color: #f0f7ff !important;
        }
        
        /* Override any green-specific elements */
        .fw-widget-wrapper .fw-success-screen,
        .fw-widget-wrapper .fw-success-icon {
          color: #2563EB !important;
        }
        
        .fw-widget-wrapper .fw-success-screen svg path {
          fill: #2563EB !important;
        }
      `,
    };

    // Initialize the Freshdesk widget
    (function () {
      if (typeof window.FreshworksWidget !== 'function') {
        const n = function () {
          n.q.push(arguments);
        };
        n.q = [];
        window.FreshworksWidget = n;
      }
    })();

    // Dynamically load the Freshdesk widget script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://widget.freshworks.com/widgets/159000000026.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  });

  const openFreshdeskForm = () => {
    if (window.FreshworksWidget) {
      // Open the Freshdesk form directly
      window.FreshworksWidget('open');
    } else {
      console.error('FreshworksWidget is not loaded yet.');
    }
  };

  return (
    <div class="w-full rounded-2xl">
      <div class="relative z-10 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-dark/80 via-dark/70 to-dark/50 backdrop-blur-lg border border-white/10 shadow-2xl">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-2/3 h-1/2 bg-primary/20 blur-[80px] rounded-full"></div>
        <div class="absolute bottom-0 right-1/4 -z-10 w-1/2 h-1/3 bg-secondary/20 blur-[60px] rounded-full"></div>
        
        <h3 class="text-2xl md:text-3xl font-display font-bold mb-6 text-light text-center bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent">
          Let's Connect
        </h3>
        <p class="text-center text-light mb-8">
          We'd love to hear from you. Click the button below to start a conversation.
        </p>
        <div class="text-center">
          <button
            class="cta-button w-auto inline-flex justify-center items-center min-h-[48px] rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium text-lg transition-all duration-500 group overflow-hidden relative px-8 py-3"
            onClick={openFreshdeskForm}
          >
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-secondary opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-1000"></div>
            
            <span class="relative z-10 flex items-center justify-center">
              Contact Us
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </span>
          </button>
        </div>

        <div class="mt-8 pt-6 border-t border-white/10 text-center">
          <p class="text-light/60 text-sm mb-4">
            Or reach us directly at <a href="mailto:contact@bostonaip.com" class="text-primary hover:underline">contact@bostonaip.com</a>
          </p>
          
          {/* Social media links */}
          <div class="flex justify-center space-x-4 mt-3">
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/company/baip-ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-light/80 hover:bg-primary/20 hover:text-primary transition-all shadow-sm"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            
            {/* GitHub */}
            <a 
              href="https://github.com/BaiP-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-light/80 hover:bg-primary/20 hover:text-primary transition-all shadow-sm"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
            {/* YouTube */}
            <a 
              href="https://www.youtube.com/@BAIP-AI" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-light/80 hover:bg-primary/20 hover:text-primary transition-all shadow-sm"
              aria-label="YouTube"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
            
            {/* X (Twitter) */}
            <a 
              href="https://x.com/BAIP_AI" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-light/80 hover:bg-primary/20 hover:text-primary transition-all shadow-sm"
              aria-label="X (Twitter)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
