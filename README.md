# BAIP.AI - Boston AI Partners

A comprehensive AI platform featuring a modern corporate website and an enterprise AI aggregator, built for Fortune 500 companies to discover and leverage enterprise-ready AI tools and custom AI agents.

## 🚀 Overview

This repository contains the unified BAIP.AI platform with two main components:

### 🏢 Main Website (`/`)
A modern, responsive corporate website for Boston AI Partners featuring:
- Professional design focused on AI solutions and services
- 3D visualizations using Three.js (AI network, globe, etc.)
- Modern UI with transparent glass effects and animations
- Contact form with Supabase backend and email notifications
- Optimized for performance and SEO

### 🤖 AI Aggregator (`/aggregator`)
A comprehensive AI aggregator platform designed for Fortune 500 companies:
- Curated collection of enterprise-ready AI tools
- Business-focused categorization by departments and functions
- Custom AI agents powered by OpenAI
- Detailed information about each tool and agent
- Enterprise security focus with vetted tools

## ✨ Features

### Main Website Features
- 🚀 Responsive single page application built with Astro and SolidJS
- 🌐 3D visualizations using Three.js
- 🖥️ Modern UI with glass effects and Framer Motion animations
- 📝 Contact form with Supabase backend and email notifications
- ⚡ Optimized for performance and SEO

### AI Aggregator Features
- 📊 **Comprehensive Tool Directory**: Curated list of enterprise AI tools organized by business function
- 🤖 **Custom AI Agents**: Specialized AI assistants built for enterprise use cases
- 🏢 **Business-Focused Categories**: Tools organized by departments (HR, Finance, IT, etc.)
- 📱 **Responsive Design**: Works on all devices and screen sizes
- 🔒 **Enterprise Security Focus**: All tools vetted for enterprise security and compliance
- 🔄 **Automated Data Processing**: Scripts for fetching and processing AI tool data

## 🛠️ Technology Stack

- **[Astro](https://astro.build/)**: Fast and flexible static site generator
- **[SolidJS](https://www.solidjs.com/)**: Reactive JavaScript library for UI components
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Three.js](https://threejs.org/)**: 3D graphics library for web
- **[Supabase](https://supabase.com/)**: Backend as a Service for contact forms
- **[OpenAI](https://openai.com/)**: AI models for custom agents
- **[Framer Motion](https://www.framer.com/motion/)**: Animation library

## 📋 Prerequisites

- Node.js 18+
- npm or yarn

## 🚀 Getting Started

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BaiP-AI-Private/website.git
   cd website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   If you encounter dependency conflicts, use:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your credentials:
   ```env
   # Supabase (for contact forms)
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # OpenAI (for AI agents)
   OPENAI_API_KEY=your_openai_api_key
   ```

### Development

```bash
# Start development server
npm run dev

# The main website will be available at http://localhost:4321
# The AI aggregator will be available at http://localhost:4321/aggregator
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
/
├── public/                        # Static assets
│   ├── aggregator/                # Aggregator images and logos
|   ├── images                     # Images
│   ├── js/                        # Client-side JavaScript
│   └── favicon.svg                # Site favicon
├── src/                           # Source code
│   ├── components/                # UI components (shared + aggregator-specific)
│   │   ├── AgentCard.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── Hero3D.jsx
│   │   ├── AggregatorHero.jsx
│   │   └── ...
│   ├── layouts/                   # Page layouts
│   │   ├── Layout.astro           # Main website layout
│   │   └── AggregatorLayout.astro # Aggregator layout
│   ├── pages/                     # Page components
│   │   ├── index.astro            # Main website home
│   │   └── aggregator/            # AI aggregator pages
│   │       ├── index.astro        # Aggregator home
│   │       ├── agents/            # AI agents section
│   │       ├── categories/        # Tool categories
│   │       ├── tools.astro        # Tools listing
│   │       └── api/               # API endpoints
│   ├── data/                      # Data files for aggregator
│   │   ├── agents.js              # AI agents data
│   │   ├── categories.js          # Tool categories
│   │   ├── tools.js               # AI tools data
│   │   └── processed/             # Processed data files
│   ├── agents/                    # Custom AI agent implementations
│   ├── utils/                     # Utility functions
│   ├── lib/                       # Supabase client and utilities
│   └── styles/                    # CSS styles
├── scripts/                       # Data processing scripts
│   ├── fetch-data.js              # Fetch AI tools data
│   ├── process-data.js            # Process and categorize data
│   ├── download-logos.js          # Download tool logos
│   └── utils/                     # Script utilities
├── supabase/                      # Supabase configuration
│   └── functions/                 # Edge functions for email notifications
├── .github/workflows/             # GitHub Actions
│   ├── sync-to-public.yml         # Sync to public repository
│   └── fetch-aggregator-data.yml  # Automated data fetching
└── package.json                   # Project manifest
```

## 🔧 Available Scripts

### Main Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Aggregator Data Management
- `npm run fetch-data` - Fetch latest AI tools data
- `npm run process-data` - Process and categorize fetched data

## 🗄️ Database Setup (Supabase)

### Contact Form Table
Create a `contacts` table with the following schema:
```sql
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Edge Function Deployment
Deploy the contact notification function:
```bash
npx supabase functions deploy send-contact-notification
```

## 🤖 AI Agents

The platform includes custom AI agents for enterprise use cases:

- **Executive Assistant**: Helps with scheduling, email management, and administrative tasks
- **Research Analyst**: Conducts market research and data analysis
- **Data Analyst**: Processes and interprets business data
- **Product Manager**: Assists with product strategy and roadmap planning
- **Marketing Strategist**: Develops marketing campaigns and strategies

To add new agents, create implementations in the `src/agents/` directory.

## 🔄 Automated Data Processing

The platform includes automated workflows for keeping AI tool data up-to-date:

- **Daily Data Fetching**: Automatically fetches new AI tools and updates
- **Data Processing**:     Categorizes and enriches tool information

## 🚀 Deployment

The site supports deployment to various platforms:

- **GitHub Pages**: Automated deployment via GitHub Actions
- **Vercel**:       Connect your repository for automatic deployments
- **Netlify**:      Deploy with build command `npm run build`

### Environment Variables for Production

Set the following environment variables in your deployment platform:

```env
SUPABASE_URL=your_production_supabase_url
SUPABASE_ANON_KEY=your_production_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

## 🛡️ Security Considerations

- All AI tools are vetted for enterprise security and compliance
- API keys and sensitive data are handled securely
- Supabase provides built-in security features
- Input validation on all forms and API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support:
- Email: [contact@baip.ai](mailto:contact@baip.ai)
- Website: [https://baip.ai](https://baip.ai)
- AI Aggregator: [https://baip.ai/aggregator](https://baip.ai/aggregator)

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build/) and [SolidJS](https://www.solidjs.com/)
- Powered by [Supabase](https://supabase.com/) and [OpenAI](https://openai.com/)
- Designed for Fortune 500 enterprise needs
