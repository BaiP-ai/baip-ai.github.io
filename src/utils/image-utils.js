/**
 * Image path utilities for Astro deployment
 * Handles base URL configuration for proper image loading
 */

/**
 * Get the correct image path for Astro deployment
 * Handles base URL configuration automatically
 * @param {string} imagePath - The image path (e.g., "/images/logos/company.png")
 * @returns {string} - The correct path for the current environment
 */
export function getImagePath(imagePath) {
  if (!imagePath) return `${import.meta.env.BASE_URL || ''}images/logos/placeholder.svg`;
  
  // Remove any existing base URL prefix to avoid duplication
  let cleanPath = imagePath;
  const baseUrl = import.meta.env.BASE_URL || '/';
  if (baseUrl !== '/' && cleanPath.startsWith(baseUrl)) {
    cleanPath = cleanPath.substring(baseUrl.length);
  }
  
  // Remove leading slash if present for consistency
  cleanPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
  
  // Return path with base URL for deployment
  const finalBase = baseUrl === '/' ? '' : (baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl);
  return `${finalBase}/${cleanPath}`;
}

/**
 * Get logo path specifically for company logos
 * @param {object} company - Company object with logo property
 * @returns {string} - The correct logo path
 */
export function getLogoPath(company) {
  if (!company?.logo) {
    return getImagePath('/images/logos/placeholder.svg');
  }
  
  return getImagePath(company.logo);
}

/**
 * Check if an image path is valid (not placeholder)
 * @param {string} imagePath - The image path to check
 * @returns {boolean} - True if it's a real image (not placeholder)
 */
export function isValidImage(imagePath) {
  return imagePath && !imagePath.includes('placeholder.svg');
}
