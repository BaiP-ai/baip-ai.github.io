# Boston AI Partners Website

A modern, responsive SPA website for Boston AI Partners using Astro and SolidJS with 3D visualizations via Three.js and Supabase integration for the contact form with email notifications.

## Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch of this repository. The GitHub Actions workflow handles building the site and deploying it directly to the `gh-pages` branch of the public repository.

## Features

- 🚀 Responsive single page application built with Astro and SolidJS
- 🌐 3D visualizations using Three.js (AI network, globe, etc.)
- 🖥️ Modern UI with transparent glass effects and animations using Framer Motion
- 📝 Contact form with Supabase backend and email notification functionality
- ⚡ Optimized for performance and SEO
- 🧠 Professional design focused on AI solutions and services

## Setup

### Prerequisites
- Node.js 16+ and npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/baip-fe-ui.git
   cd baip-fe-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

   If you encounter dependency conflicts, use:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update with your Supabase credentials

4. For email notifications, deploy the Supabase Edge Function:
   ```bash
   npx supabase functions deploy send-contact-notification
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

- `src/`
  - `components/` - SolidJS UI components
  - `layouts/` - Page layout templates
  - `pages/` - Astro pages
  - `styles/` - Global CSS styles
  - `lib/` - Utility functions and Supabase client
- `public/` - Static assets
- `supabase/functions/` - Supabase Edge Functions for backend logic

## Supabase Setup

1. Create a new Supabase project
2. Create a `contacts` table with the following schema:
   - `id`: uuid (primary key)
   - `name`: text
   - `email`: text
   - `company`: text
   - `message`: text
   - `created_at`: timestamp with time zone
3. Deploy the Edge Function for email notifications
4. Set the required environment variables in the Supabase dashboard

## License

MIT
