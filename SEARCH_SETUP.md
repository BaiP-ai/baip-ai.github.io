# Search Installation & Setup Guide

## Quick Start

1. **Install Dependencies**:
```bash
npm install
```

2. **Build with Search**:
```bash
npm run build
```

3. **Preview Locally**:
```bash
npm run preview
```

4. **Test Search**:
   - Visit `/aggregator` and use the search box
   - Try `/aggregator/search` for the dedicated search page
   - Test individual tool pages like `/aggregator/tools/databricks`

## Deployment Notes

### For Production:
- Ensure the build process runs `pagefind` after Astro build
- The `_pagefind` directory must be deployed with your site
- Search works entirely client-side - no server setup needed

### For Development:
- Pagefind only works on built sites, not in dev mode
- Use `npm run build && npm run preview` to test search locally

## Troubleshooting

**Search not working?**
1. Check that `_pagefind` directory exists in `dist/`
2. Verify Pagefind script is loading (check browser dev tools)
3. Ensure pages have `data-pagefind-body` attributes

**Poor search results?**
1. Check `data-pagefind-meta` attributes are properly set
2. Review `pagefind.yml` configuration
3. Rebuild the search index

**SEO Issues?**
1. Verify sitemap is generated at `/aggregator-sitemap.xml`
2. Check individual pages have proper metadata
3. Ensure canonical URLs are set correctly

## Next Steps

1. Monitor search performance and user behavior
2. Add more filtering options as content grows
3. Consider implementing search analytics
4. Optimize based on actual usage patterns

The search implementation is now complete and ready for production use!
