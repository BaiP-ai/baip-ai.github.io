import { createSignal, createEffect, onCleanup } from 'solid-js';
import { Motion, Presence } from '@motionone/solid';

const promptsAndResponses = [
  {
    prompt: "How can AI optimize university applications?",
    response: "AI can automate document checks, track deadlines, personalize recommendations based on student profiles, and predict admission chances, streamlining the entire process."
  },
  {
    prompt: "What are the benefits of custom enterprise AI?",
    response: "Custom AI leverages your internal data to answer specific business questions, automate unique workflows, create tailored copilots, and align AI investments with strategic goals for maximum ROI."
  },
  {
    prompt: "Why is responsible AI development important?",
    response: "Responsible AI ensures fairness, transparency, and accountability. It builds trust, mitigates risks like bias, ensures compliance with regulations (like GDPR & EU AI Act), and leads to more ethical and sustainable AI solutions."
  }
];

const AnimatedAIResponse = () => {
  const [currentPromptIndex, setCurrentPromptIndex] = createSignal(0);
  const [isTyping, setIsTyping] = createSignal(false);
  const [typedText, setTypedText] = createSignal('');
  const [charIndex, setCharIndex] = createSignal(0);
  const [showPrompt, setShowPrompt] = createSignal(true);

  let typingInterval;
  let nextPromptTimeout;
  let promptTransitionTimeout;

  createEffect(() => {
    clearInterval(typingInterval);
    clearTimeout(nextPromptTimeout);
    clearTimeout(promptTransitionTimeout);

    setShowPrompt(false);

    promptTransitionTimeout = setTimeout(() => {
      const currentData = promptsAndResponses[currentPromptIndex()];
      const fullResponse = currentData.response;
      setTypedText('');
      setCharIndex(0);
      setShowPrompt(true);

      setTimeout(() => {
        setIsTyping(true);
        typingInterval = setInterval(() => {
          setCharIndex(prev => {
            const nextIndex = prev + 1;
            if (nextIndex > fullResponse.length) {
              clearInterval(typingInterval);
              setIsTyping(false);
              nextPromptTimeout = setTimeout(() => {
                setCurrentPromptIndex(prev => (prev + 1) % promptsAndResponses.length);
              }, 3000);
              return prev;
            }
            setTypedText(fullResponse.substring(0, nextIndex));
            return nextIndex;
          });
        }, 50);
      }, 150);

    }, 300);

  });

  onCleanup(() => {
    clearInterval(typingInterval);
    clearTimeout(nextPromptTimeout);
    clearTimeout(promptTransitionTimeout);
  });

  return (
    <Motion.div
      class="glass-panel p-6 h-full flex flex-col" // Hover effect will apply via glass-panel class
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* User Prompt Section */}
      <div class="mb-4 min-h-[60px] flex space-x-3"> {/* Use flex and add spacing */}
        {/* User Avatar */}
        <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center shadow">
          {/* Simple user icon */}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>

        {/* Prompt Content */}
        <div class="flex-grow">
          <span class="text-sm font-medium text-gray-700 block mb-1">User Prompt:</span> {/* Make label block */}
          <Presence>
            {showPrompt() && (
              <Motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                // Use dark text for prompt
                class="font-medium text-dark"
              >
                {promptsAndResponses[currentPromptIndex()].prompt}
              </Motion.p>
            )}
          </Presence>
        </div>
      </div>

      {/* AI Response Section */}
      {/* Adjusted border color to match panel border */}
      <div class="flex-grow border-t border-gray-300/50 pt-4 flex space-x-3"> {/* Use flex and add spacing */}
        {/* AI Avatar */}
        <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow">
          {/* Simple icon placeholder for avatar */}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17.25v-.172c0-.969.525-1.841 1.34-2.318.31-.18.65-.29 1.008-.29h.013c.358 0 .707.11 1.008.29.815.477 1.34 1.349 1.34 2.318v.172M12 10.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Response Content */}
        <div class="flex-grow">
          <span class="text-sm font-medium text-primary block mb-1">BaiP Assistant:</span> {/* Make label block */}
          {/* Use slightly darker text for response */}
          <p class="text-gray-800"> 
            {typedText()}
            {isTyping() && <span class="inline-block w-2 h-4 bg-primary ml-1 animate-pulse"></span>} 
          </p>
        </div>
      </div>
    </Motion.div>
  );
};

export default AnimatedAIResponse;
