import { Motion } from '@motionone/solid';

// Import the same function used in the Navbar
const openContactModal = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'));
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer class="bg-gradient-to-b from-light to-gray-100 border-t border-gray-200 pt-16 pb-8">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <div class="flex items-center mb-4">
              <img src="/images/ai-logo.svg" alt="BaiP Logo" class="h-10 mr-3" />
              <div class="text-2xl font-display font-bold text-blue-600">BaiP</div>
            </div>
            <p class="text-dark/80 max-w-xs">
              Empowering the future with responsible, real-world AI solutions that respect people and data.
            </p>
          </div>
          
          <div>
            <h3 class="font-display font-bold text-dark mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><a href="#about" class="text-dark/80 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#services" class="text-dark/80 hover:text-primary transition-colors">Services</a></li>
              <li><a href="#approach" class="text-dark/80 hover:text-primary transition-colors">Our Approach</a></li>
              <li><button onClick={openContactModal} class="text-dark/80 hover:text-primary transition-colors text-left">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-display font-bold text-dark mb-4">Get in Touch</h3>
            <p class="text-dark/80 mb-4">
              Boston, Massachusetts<br />
              <a href="mailto:contact@baip.ai" class="hover:text-primary transition-colors">contact@baip.ai</a>
            </p>
            
            <div class="flex space-x-4">
              <Motion.a 
                href="https://www.linkedin.com/company/boston-ai-partners/" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-dark/80 hover:bg-primary/20 hover:text-primary transition-all shadow-sm"
                whileHover={{ scale: 1.1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Motion.a>
              
              <Motion.a 
                href="https://x.com/baip_ai" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-dark/80 hover:bg-primary/20 hover:text-primary transition-all shadow-sm"
                whileHover={{ scale: 1.1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </Motion.a>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-200 pt-8 text-center text-dark/60 text-sm">
          <p>&copy; {currentYear} Boston AI Partners. All rights reserved.</p>
          <div class="mt-2 flex justify-center space-x-6">
            <a href="#" class="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
