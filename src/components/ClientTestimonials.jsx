import { createSignal, onMount } from 'solid-js';
import { Motion } from '@motionone/solid';

const ClientTestimonials = () => {
  const [activeIndex, setActiveIndex] = createSignal(0);
  
  const testimonials = [
    {
      quote: "BaiP's AI platform has transformed how our agency manages university applications, saving us countless hours and improving outcomes for students.",
      author: "Future Client",
      role: "University Admissions Agency",
      avatar: "/placeholders/avatar1.png"
    },
    {
      quote: "Working with BaiP to develop our internal AI capabilities has given us a competitive edge in our industry. Their approach to responsible AI is refreshing.",
      author: "Future Enterprise Partner",
      role: "Fortune 500 Company",
      avatar: "/placeholders/avatar2.png"
    },
    {
      quote: "The team at BaiP understands not just the technical aspects of AI but how to apply it to solve real business challenges with measurable impact.",
      author: "Future Industry Leader",
      role: "Technology Director",
      avatar: "/placeholders/avatar3.png"
    }
  ];
  
  onMount(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  });
  
  return (
    <div class="glass-panel p-8 md:p-12 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent pointer-events-none"></div>
      
      <h3 class="text-2xl md:text-3xl font-display font-bold mb-8 text-center">What Our Partners Say</h3>
      
      <div class="relative h-[300px]">
        {testimonials.map((testimonial, index) => (
          <Motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: activeIndex() === index ? 1 : 0, x: activeIndex() === index ? 0 : 50 }}
            transition={{ duration: 0.5 }}
            class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
            style={{ "display": activeIndex() === index ? "flex" : "none" }}
          >
            <div class="max-w-2xl">
              <svg class="w-12 h-12 text-primary/30 mx-auto mb-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path>
              </svg>
              
              <p class="text-xl italic mb-6">{testimonial.quote}</p>
              
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-2xl font-bold mb-2">
                  {testimonial.author.charAt(0)}
                </div>
                <div class="font-display font-bold">{testimonial.author}</div>
                <div class="text-light/60 text-sm">{testimonial.role}</div>
              </div>
            </div>
          </Motion.div>
        ))}
      </div>
      
      <div class="flex justify-center space-x-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            onClick={() => setActiveIndex(index)}
            class={`w-3 h-3 rounded-full transition-all ${activeIndex() === index ? 'bg-primary scale-110' : 'bg-white/20'}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientTestimonials;
