import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// List of files to update
const filesToUpdate = [
  'categories.astro',
  'tools.astro', 
  'about.astro',
  'contact.astro',
  'enterprise.astro',
  '404.astro',
  'agents/[id].astro',
  'categories/[id].astro'
];

async function updateFile(filePath) {
  try {
    console.log(`Updating ${filePath}...`);
    let content = await readFile(filePath, 'utf-8');
    
    // Update import paths
    content = content.replace(/from '\.\.\/layouts\/Layout\.astro'/g, "from '../../layouts/AggregatorLayout.astro'");
    content = content.replace(/from '\.\.\/components\/Hero\.jsx'/g, "from '../../components/AggregatorHero.jsx'");
    content = content.replace(/from '\.\.\/components\//g, "from '../../components/");
    content = content.replace(/from '\.\.\/data\//g, "from '../../data/");
    content = content.replace(/from '\.\.\/utils\//g, "from '../../utils/");
    
    // Update component references
    content = content.replace(/<Layout/g, '<AggregatorLayout');
    content = content.replace(/<\/Layout>/g, '</AggregatorLayout>');
    content = content.replace(/<Hero /g, '<AggregatorHero ');
    content = content.replace(/<Hero\/>/g, '<AggregatorHero />');
    
    await writeFile(filePath, content);
    console.log(`✓ Updated ${filePath}`);
  } catch (error) {
    console.error(`✗ Error updating ${filePath}:`, error.message);
  }
}

async function main() {
  const basePath = join(__dirname, 'src', 'pages', 'aggregator');
  
  for (const file of filesToUpdate) {
    const fullPath = join(basePath, file);
    await updateFile(fullPath);
  }
  
  console.log('All files updated!');
}

main().catch(console.error);
