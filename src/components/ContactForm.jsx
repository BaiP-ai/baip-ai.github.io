import { onMount } from 'solid-js';

const ContactForm = () => {
  onMount(() => {
    // Configure Freshdesk widget settings
    window.fwSettings = {
      widget_id: 159000000026,
      // Hide the default launcher
      hide_chat_button: true,
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
        <h3 class="text-2xl md:text-3xl font-display font-bold mb-6 text-light text-center">
          Let's Connect
        </h3>
        <p class="text-center text-light mb-4">
          Click the button below to contact us.
        </p>
        <div class="text-center">
          <button
            class="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            onClick={openFreshdeskForm}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
