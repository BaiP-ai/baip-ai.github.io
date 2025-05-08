import { createSignal } from 'solid-js';
import { submitContactForm, testSupabaseConnection, setupContactTable, setupContactTableWithRLS } from '../lib/supabase';
import { Motion, Presence } from '@motionone/solid';

const ContactForm = () => {
  const [formData, setFormData] = createSignal({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [status, setStatus] = createSignal({
    submitting: false,
    success: null,
    error: null
  });

  const [activeField, setActiveField] = createSignal(null);
  
  const handleFocus = (field) => setActiveField(field);
  const handleBlur = () => setActiveField(null);

  const [mousePosition, setMousePosition] = createSignal({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData(),
      [name]: value
    });
    if (status().error || status().success) {
      setStatus({ submitting: false, success: null, error: null });
    }
  };
  
  const testConnection = async () => {
    try {
      const result = await testSupabaseConnection();
      alert(result.success ? 
        `Connection test successful: ${JSON.stringify(result.data)}` : 
        `Connection test failed: ${result.error?.message || JSON.stringify(result.error)}`);
    } catch (error) {
      alert(`Error testing connection: ${error.message}`);
    }
  };
  
  const setupTable = async () => {
    try {
      const result = await setupContactTable(); // Uses the version WITHOUT RLS
      alert(result.success ? 
        `Table setup successful!` : 
        `Table setup failed: ${result.error?.message || JSON.stringify(result.error)}`);
    } catch (error) {
      alert(`Error setting up table: ${error.message}`);
    }
  };
  
  const setupTableWithRLS = async () => {
    try {
      const result = await setupContactTableWithRLS(); // Uses the version WITH RLS
      alert(result.success ? 
        `Table setup with RLS successful!` : 
        `Table setup with RLS failed: ${result.error?.message || JSON.stringify(result.error)}`);
    } catch (error) {
      alert(`Error setting up table with RLS: ${error.message}`);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: null, error: null });
    
    try {
      // First test connection (optional - remove in production)
      const test = await testSupabaseConnection();
      console.log("Connection test before submit:", test);
      
      await submitContactForm(formData());
      setStatus({ 
        submitting: false, 
        success: "Thanks for reaching out! We'll get back to you soon.",
        error: null
      });
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = (error instanceof Error ? error.message : String(error)) || "Something went wrong. Please try again later.";
      setStatus({ 
        submitting: false,
        success: null,
        error: errorMessage 
      });
    }
  };
  
  return (
    <div class="w-full rounded-2xl">
      <div class="relative z-10 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-dark/80 via-dark/70 to-dark/50 backdrop-blur-lg border border-white/10 shadow-2xl">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-2/3 h-1/2 bg-primary/20 blur-[80px] rounded-full"></div>
        <div class="absolute bottom-0 right-1/4 -z-10 w-1/2 h-1/3 bg-secondary/20 blur-[60px] rounded-full"></div>
        
        <Motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          class="text-2xl md:text-3xl font-display font-bold mb-6 text-light text-center bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent"
        >
          Let's Connect
        </Motion.h3>
        
        <Presence>
          {status().success && (
            <Motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              class="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6 overflow-hidden"
            >
              <p class="text-green-300">{status().success}</p>
            </Motion.div>
          )}
        </Presence>
        
        <Presence>
          {status().error && (
            <Motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              class="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6 overflow-hidden"
            >
              <p class="text-red-300">{String(status().error)}</p>
            </Motion.div>
          )}
        </Presence>
        
        <form onSubmit={handleSubmit} class="space-y-6 relative z-10">
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            class="transition-all duration-300"
          >
            <label for="name" class="block mb-1 text-sm font-medium text-light">Name</label>
            <div class="relative">
              <input
                type="text"
                id="name"
                name="name"
                class="input-field bg-dark/40 border-white/10 text-light placeholder:text-light/50 focus:ring-primary/70 w-full rounded-lg px-4 py-3 transition-all duration-300"
                value={formData().name}
                onInput={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                required
                placeholder="Your name"
              />
              <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 transition-opacity duration-300 pointer-events-none" 
                   classList={{ "opacity-20": activeField() === 'name' }}></div>
            </div>
          </Motion.div>
          
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            class="transition-all duration-300"
          >
            <label for="email" class="block mb-1 text-sm font-medium text-light">Email</label>
            <div class="relative">
              <input
                type="email"
                id="email"
                name="email"
                class="input-field bg-dark/40 border-white/10 text-light placeholder:text-light/50 focus:ring-primary/70 w-full rounded-lg px-4 py-3 transition-all duration-300"
                value={formData().email}
                onInput={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                required
                placeholder="your.email@example.com"
              />
              <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 transition-opacity duration-300 pointer-events-none" 
                   classList={{ "opacity-20": activeField() === 'email' }}></div>
            </div>
          </Motion.div>
          
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            class="transition-all duration-300"
          >
            <label for="company" class="block mb-1 text-sm font-medium text-light">Company (Optional)</label>
            <div class="relative">
              <input
                type="text"
                id="company"
                name="company"
                class="input-field bg-dark/40 border-white/10 text-light placeholder:text-light/50 focus:ring-primary/70 w-full rounded-lg px-4 py-3 transition-all duration-300"
                value={formData().company}
                onInput={handleChange}
                onFocus={() => handleFocus('company')}
                onBlur={handleBlur}
                placeholder="Your company"
              />
              <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 transition-opacity duration-300 pointer-events-none" 
                   classList={{ "opacity-20": activeField() === 'company' }}></div>
            </div>
          </Motion.div>
          
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            class="transition-all duration-300"
          >
            <label for="message" class="block mb-1 text-sm font-medium text-light">Message</label>
            <div class="relative">
              <textarea
                id="message"
                name="message"
                rows="3"
                class="input-field resize-none bg-dark/40 border-white/10 text-light placeholder:text-light/50 focus:ring-primary/70 w-full rounded-lg px-4 py-3 transition-all duration-300"
                value={formData().message}
                onInput={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                required
                placeholder="Your message here..."
              ></textarea>
              <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 transition-opacity duration-300 pointer-events-none" 
                   classList={{ "opacity-20": activeField() === 'message' }}></div>
            </div>
          </Motion.div>
          
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            class="relative mt-6"
          >
            <button
              type="submit"
              class="cta-button w-full flex justify-center items-center min-h-[48px] rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium text-lg transition-all duration-500 group overflow-hidden relative"
              disabled={status().submitting}
            >
              <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-secondary opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-1000"></div>
              
              <span class="relative z-10 flex items-center justify-center">
                {status().submitting ? (
                  <>
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </Motion.div>
        </form>
        
        <div class="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-sm"></div>
        <div class="absolute bottom-8 left-6 w-4 h-4 rounded-full bg-gradient-to-br from-blue-400/20 to-primary/20 blur-sm"></div>
      </div>
    </div>
  );
};

export default ContactForm;
