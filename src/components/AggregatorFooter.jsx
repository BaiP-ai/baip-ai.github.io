import { getSitePath } from '../utils/paths.js';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer class="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700 pt-16 pb-8">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex flex-col">
                <span class="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Aggregator
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  by Boston AI Partners
                </span>
              </div>
            </div>
            <p class="text-gray-700 dark:text-gray-300 max-w-xs">
              Comprehensive AI tools and solutions for Fortune 500 companies. Discover, evaluate, and implement enterprise-ready AI technologies.
            </p>
          </div>
          
          <div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><a href={getSitePath('/')} class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href={getSitePath('/tools')} class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">AI Tools</a></li>
              <li><a href={getSitePath('/categories')} class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Categories</a></li>
              <li><a href={getSitePath('/agents')} class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">AI Agents</a></li>
              <li><a href={getSitePath('/enterprise')} class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Enterprise</a></li>
              <li><a href={getSitePath('/contact')} class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Boston, Massachusetts<br />
              <a href="mailto:contact@baip.ai" class="hover:text-blue-600 transition-colors">contact@baip.ai</a>
            </p>
            
            <div class="flex space-x-4">
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/baip-ai/" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-600/20 hover:text-blue-600 transition-all shadow-sm hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              
              {/* X (Twitter) */}
              <a 
                href="https://x.com/BAIP_AI" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-600/20 hover:text-blue-600 transition-all shadow-sm hover:scale-110"
                aria-label="X (Twitter)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              
              {/* GitHub */}
              <a 
                href="https://github.com/BaiP-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-600/20 hover:text-blue-600 transition-all shadow-sm hover:scale-110"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              
              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@BAIP-AI" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-600/20 hover:text-blue-600 transition-all shadow-sm hover:scale-110"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>&copy; {currentYear} Boston AI Partners. All rights reserved.</p>
          <div class="mt-2 flex justify-center space-x-6">
            <a href={getSitePath('/about')} class="hover:text-blue-600 transition-colors">About</a>
            <a href="#" class="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-blue-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;