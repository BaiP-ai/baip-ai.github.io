# Blog Implementation Guide

This document describes the blog functionality that has been added to the Boston AI Partners website.

## Overview

The blog system uses Astro's content collections feature to manage markdown blog posts with frontmatter metadata. It includes:

- Blog post listing page at `/blog`
- Individual blog post pages at `/blog/[slug]`
- Responsive design matching the website's visual style
- Support for featured posts, tags, and author information
- RSS feed at `/rss.xml`

## File Structure

```
src/
├── content/
│   ├── blog/           # Markdown blog posts
│   └── config.ts       # Content collection configuration
├── pages/
│   ├── blog/
│   │   ├── index.astro    # Blog listing page
│   │   └── [...slug].astro # Individual blog post pages
│   └── rss.xml.js      # RSS feed
├── layouts/
│   └── BlogPost.astro  # Blog post layout
└── components/
    └── FormattedDate.astro # Date formatting component

public/
└── images/
    └── blog/           # Blog post images
```

## Creating Blog Posts

1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter with required fields:

```markdown
---
title: "Your Blog Post Title"
description: "Brief description for SEO and previews"
pubDate: 2025-05-30
author: "Author Name"
heroImage: "/images/blog/your-image.jpg"
tags: ["AI", "Technology", "Tutorial"]
featured: true  # Optional: shows in featured section
---

# Your Blog Post Content

Write your blog post content in Markdown format...
```

## Frontmatter Fields

- `title` (required): The blog post title
- `description` (required): Brief description for SEO and post previews
- `pubDate` (required): Publication date (YYYY-MM-DD format)
- `author` (optional): Author name
- `heroImage` (optional): Path to hero image in `/public/images/blog/`
- `tags` (optional): Array of tag strings
- `featured` (optional): Boolean to mark as featured post
- `updatedDate` (optional): Last updated date

## Styling

The blog uses Tailwind CSS with the typography plugin for content styling. The design follows the website's existing color scheme and layout patterns.

## Navigation

The blog link has been added to both desktop and mobile navigation menus in the Navbar component, positioned after the "AI Aggregator" link.

## RSS Feed

An RSS feed configuration has been created but is currently disabled to avoid build errors. To enable it:

1. Install the RSS dependency: `npm install @astrojs/rss`
2. Rename `src/pages/rss.xml.js.disabled` to `src/pages/rss.xml.js`
3. The RSS feed will be available at `/rss.xml`

The RSS dependency has been added to package.json but the file is disabled until explicitly enabled.

## Dependencies Added

- `@tailwindcss/typography`: For prose styling in blog content
- `@astrojs/rss`: For RSS feed generation (optional, currently disabled)

## Next Steps

1. Install the new dependencies: `npm install`
2. Add actual hero images to `public/images/blog/`
3. Replace sample blog posts with real content
4. Test the implementation locally with `npm run dev`
5. Deploy the updated website
6. (Optional) Enable RSS feed by renaming `rss.xml.js.disabled` to `rss.xml.js`

## Sample Blog Posts

Five sample blog posts have been created to demonstrate the functionality:

1. "The Next Leap in AI: From Reactive to Reasoning Intelligence" (featured) - NEW
2. "Welcome to the Boston AI Partners Blog" (featured)
3. "5 Key Principles of Responsible AI Development"
4. "The Future of Enterprise AI: Trends to Watch in 2025" 
5. "AI Implementation Checklist for Small and Medium Businesses"

These can be modified or replaced with actual content as needed.
