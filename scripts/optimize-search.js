EFIND_DIR, 'pagefind.js');
  
  if (existsSync(configPath)) {
    console.log('⚙️ Optimizing search configuration...');
    
    let configContent = readFileSync(configPath, 'utf8');
    
    // Add custom search optimizations
    const optimizations = `
// Custom search optimizations for BAIP.ai
window.pagefindConfig = {
  excerptLength: 30,
  highlightParam: "highlight",
  mergeIndex: [],
  showSubResults: true,
  showImages: true,
  processContent: function(content) {
    // Enhance content processing for better search results
    return content;
  }
};
`;
    
    configContent = optimizations + configContent;
    writeFileSync(configPath, configContent);
    console.log('✅ Search configuration optimized');
  }

  // Create search statistics
  const statsPath = join(PAGEFIND_DIR, 'search-stats.json');
  const stats = {
    buildDate: new Date().toISOString(),
    indexSize: 'Unknown',
    totalPages: 'Unknown',
    categories: ['AI Tools', 'AI Agents', 'Categories'],
    features: [
      'Real-time search',
      'Category filtering',
      'Fuzzy matching',
      'Excerpt highlighting',
      'Mobile optimized'
    ]
  };
  
  writeFileSync(statsPath, JSON.stringify(stats, null, 2));
  console.log('📊 Search statistics generated');

  // Generate search manifest for better caching
  const manifestPath = join(PAGEFIND_DIR, 'search-manifest.json');
  const manifest = {
    version: '1.0.0',
    name: 'BAIP.ai Enterprise AI Search',
    description: 'Search index for enterprise AI tools and agents',
    buildDate: new Date().toISOString(),
    paths: {
      index: '_pagefind/pagefind.js',
      wasm: '_pagefind/pagefind.wasm',
      meta: '_pagefind/pagefind-entry.json'
    }
  };
  
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('📋 Search manifest created');

  console.log('🎉 Pagefind optimization complete!');
  console.log(`📁 Search files located in: ${PAGEFIND_DIR}`);

} catch (error) {
  console.error('❌ Error optimizing Pagefind:', error.message);
  process.exit(1);
}
