import { createSignal, createEffect, onMount } from 'solid-js';

const PagefindSearch = (props) => {
  const { 
    placeholder = "Search for AI tools and agents...",
    showFilters = true,
    maxResults = 10
  } = props;

  const [searchTerm, setSearchTerm] = createSignal('');
  const [results, setResults] = createSignal([]);
  const [isLoading, setIsLoading] = createSignal(false);
  const [isOpen, setIsOpen] = createSignal(false);
  const [pagefind, setPagefind] = createSignal(null);
  const [fallbackData, setFallbackData] = createSignal(null);
  const [filters, setFilters] = createSignal({
    category: '',
    type: ''
  });

  // Initialize Pagefind and fallback data
  onMount(async () => {
    try {
      // Load fallback data for development mode
      const toolsModule = await import('../data/tools.js');
      const agentsModule = await import('../data/agents.js');
      
      const combinedData = [
        ...toolsModule.tools.map(tool => ({
          ...tool,
          type: 'tool',
          url: `/aggregator/tools/${tool.id}`,
          searchableContent: `${tool.name} ${tool.description} ${tool.tags?.join(' ') || ''} ${tool.useCases?.join(' ') || ''}`
        })),
        ...agentsModule.agents.map(agent => ({
          ...agent,
          type: 'agent', 
          url: `/aggregator/agents/${agent.id}`,
          searchableContent: `${agent.name} ${agent.description} ${agent.features?.join(' ') || ''}`
        }))
      ];
      
      setFallbackData(combinedData);

      // Try to load Pagefind script
      const pagefindScript = document.createElement('script');
      pagefindScript.src = '/_pagefind/pagefind.js';
      pagefindScript.onload = async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        if (window.pagefind) {
          await window.pagefind.init();
          setPagefind(window.pagefind);
        }
      };
      pagefindScript.onerror = () => {
        console.log('Pagefind not available, using fallback search for development');
      };
      document.head.appendChild(pagefindScript);
    } catch (error) {
      console.warn('Error initializing search:', error);
    }
  });

  // Fallback search function for development
  const performFallbackSearch = (term) => {
    if (!fallbackData() || !term.trim()) {
      setResults([]);
      return;
    }

    const searchTerm = term.toLowerCase();
    let filteredData = fallbackData();

    // Apply filters
    if (filters().category) {
      filteredData = filteredData.filter(item => 
        item.category === filters().category
      );
    }
    
    if (filters().type) {
      filteredData = filteredData.filter(item => 
        item.type === filters().type.replace('s', '') // tools -> tool, agents -> agent
      );
    }

    // Search in content
    const searchResults = filteredData
      .filter(item => 
        item.searchableContent.toLowerCase().includes(searchTerm)
      )
      .slice(0, maxResults)
      .map(item => ({
        id: item.id,
        url: item.url,
        title: item.name,
        excerpt: item.description.slice(0, 150) + '...',
        meta: {
          category: item.category,
          subcategory: item.subcategory,
          type: item.type
        },
        score: 0.8 // Mock score for fallback
      }));

    setResults(searchResults);
  };

  // Perform search (Pagefind or fallback)
  const performSearch = async (term) => {
    if (!term.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);

    try {
      if (pagefind()) {
        // Use Pagefind if available
        const search = await pagefind().search(term, {
          limit: maxResults,
          filters: filters()
        });

        const searchResults = await Promise.all(
          search.results.map(async (result) => {
            const data = await result.data();
            return {
              id: result.id,
              url: data.url,
              title: data.meta?.title || data.raw_content?.slice(0, 60) + '...',
              excerpt: data.excerpt,
              meta: data.meta || {},
              score: result.score
            };
          })
        );

        setResults(searchResults);
      } else {
        // Use fallback search for development
        performFallbackSearch(term);
      }
    } catch (error) {
      console.error('Search error:', error);
      // Try fallback on error
      performFallbackSearch(term);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input
  const handleInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Debounce search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters(), [filterType]: value };
    setFilters(newFilters);
    
    if (searchTerm()) {
      performSearch(searchTerm());
    }
  };

  // Close results when clicking outside
  createEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setIsOpen(false);
      }
    };

    if (isOpen()) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  });

  return (
    <div class="search-container relative max-w-2xl mx-auto">
      {/* Search Input */}
      <div class="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm()}
          onInput={handleInput}
          onFocus={() => searchTerm() && setIsOpen(true)}
          class="w-full py-4 px-6 pr-14 rounded-full bg-white text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-xl transition-all"
        />
        <button 
          class="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
          onClick={() => performSearch(searchTerm())}
        >
          {isLoading() ? (
            <div class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div class="flex flex-wrap justify-center mt-4 gap-2">
          <select 
            class="text-sm bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={filters().category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="business-operations">Business Operations</option>
            <option value="customer-experience">Customer Experience</option>
            <option value="development-tools">Development Tools</option>
            <option value="ai-agents">AI Agents</option>
            <option value="cybersecurity">Cybersecurity</option>
          </select>
          
          <select 
            class="text-sm bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={filters().type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">All Types</option>
            <option value="tools">AI Tools</option>
            <option value="agents">AI Agents</option>
          </select>
        </div>
      )}

      {/* Search Results Dropdown */}
      {isOpen() && (
        <div class="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
          {isLoading() ? (
            <div class="p-4 text-center">
              <div class="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p class="mt-2 text-gray-600">Searching...</p>
            </div>
          ) : results().length > 0 ? (
            <div>
              <div class="p-3 border-b border-gray-100">
                <p class="text-sm text-gray-600">
                  Found {results().length} result{results().length !== 1 ? 's' : ''} for "{searchTerm()}"
                  {!pagefind() && <span class="text-xs text-orange-600 ml-2">(Development mode)</span>}
                </p>
              </div>
              {results().map((result) => (
                <a 
                  href={result.url}
                  class="block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-900 mb-1">{result.title}</h3>
                      <p class="text-sm text-gray-600 mb-2" innerHTML={result.excerpt}></p>
                      <div class="flex flex-wrap gap-1">
                        {result.meta.category && (
                          <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {result.meta.category}
                          </span>
                        )}
                        {result.meta.subcategory && (
                          <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {result.meta.subcategory}
                          </span>
                        )}
                        {result.meta.type && (
                          <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                            {result.meta.type}
                          </span>
                        )}
                      </div>
                    </div>
                    <div class="ml-3 text-xs text-gray-400">
                      {pagefind() ? `Score: ${Math.round(result.score * 100)}%` : 'Match'}
                    </div>
                  </div>
                </a>
              ))}
              <div class="p-3 text-center border-t border-gray-100">
                <button 
                  class="text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => {
                    window.location.href = `/aggregator/search?q=${encodeURIComponent(searchTerm())}`;
                  }}
                >
                  View all results →
                </button>
              </div>
            </div>
          ) : searchTerm() ? (
            <div class="p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p class="text-gray-600 mb-2">No results found for "{searchTerm()}"</p>
              <p class="text-sm text-gray-500">
                {!pagefind() ? 
                  "Try building the site (npm run build) for full search functionality" :
                  "Try adjusting your search terms or filters"
                }
              </p>
            </div>
          ) : null}
        </div>
      )}

      {/* Popular Search Tags */}
      {!isOpen() && (
        <div class="flex flex-wrap justify-center mt-4 gap-2">
          {[
            "Data Analytics",
            "Customer Experience", 
            "AI Agents",
            "Cybersecurity",
            "Machine Learning",
            "Business Intelligence"
          ].map((tag) => (
            <button
              class="text-sm bg-white bg-opacity-20 text-white px-3 py-1 rounded-full cursor-pointer hover:bg-opacity-30 transition-all"
              onClick={() => {
                setSearchTerm(tag);
                performSearch(tag);
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PagefindSearch;
