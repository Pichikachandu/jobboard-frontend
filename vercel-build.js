import { execSync } from 'child_process';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting Vercel build process...');

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Build the app
console.log('Building the application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  
  // Create _redirects file in dist directory
  const distDir = join(process.cwd(), 'dist');
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }
  
  writeFileSync(
    join(distDir, '_redirects'),
    '/* /index.html 200'
  );
  
  console.log('Vercel build process completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
