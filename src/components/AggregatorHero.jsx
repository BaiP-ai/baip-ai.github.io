// Hero component for the main page
import PagefindSearch from './PagefindSearch.jsx';

const Hero = (props) => {
  const { 
    title = "Enterprise AI Aggregator", 
    subtitle = "Discover the best AI tools for Fortune 500 companies",
    showSearch = true
  } = props;

  return (
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 md:py-24">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">{title}</h1>
        <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">{subtitle}</p>
        
        {showSearch && (
          <PagefindSearch />
        )}
      </div>
    </section>
  );
};

export default Hero;