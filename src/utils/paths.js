/**
 * Utility functions for path handling with base URL support
 */

/**
 * Utility functions for path handling with base URL support
 */

/**
 * Get a site path with proper base URL prefix for aggregator pages
 * @param {string} path - The path to prefix  
 * @returns {string} - The path with proper base URL prefix
 */
export function getSitePath(path) {
  const baseUrl = import.meta.env.BASE_URL || '/';
  // Ensure path starts with a slash but doesn't have a trailing slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Ensure baseUrl doesn't end with a slash unless it's just '/'
  const cleanBase = baseUrl === '/' ? '' : (baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl);
  
  // For root path, return aggregator base
  if (cleanPath === '/') {
    return `${cleanBase}/aggregator`;
  }
  
  // For other paths, avoid double slashes and ensure they stay within aggregator
  if (cleanPath.startsWith('/aggregator')) {
    return `${cleanBase}${cleanPath}`;
  } else {
    return `${cleanBase}/aggregator${cleanPath}`;
  }
}

/**
 * Get an asset path with proper base URL prefix
 * This function helps handle both development mode and production deployment
 * @param {string} path - The asset path to prefix
 * @returns {string} - The asset path with proper base URL prefix
 */
export function getAssetPath(path) {
  if (!path) return getSitePath('/images/placeholder.svg');
  
  // Remove any existing base URL prefix to avoid duplication
  let cleanPath = path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  if (baseUrl !== '/' && cleanPath.startsWith(baseUrl)) {
    cleanPath = cleanPath.substring(baseUrl.length);
  }
  
  // Ensure the path starts with a slash for consistency
  cleanPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  
  return getSitePath(cleanPath);
}
