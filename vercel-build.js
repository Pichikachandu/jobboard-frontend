const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vercel build process...');

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Create vercel.json configuration
console.log('Creating vercel.json configuration...');
const vercelConfig = {
  version: 2,
  builds: [
    {
      src: 'package.json',
      use: '@vercel/static-build',
      config: {
        distDir: 'dist'
      }
    }
  ],
  routes: [
    {
      src: '^/assets/(.*)',
      dest: '/assets/$1'
    },
    {
      src: '^/static/(.*)',
      dest: '/static/$1'
    },
    {
      src: '^/(.*)$',
      dest: '/index.html'
    }
  ]
};

// Write vercel.json
fs.writeFileSync(
  path.join(process.cwd(), 'vercel.json'),
  JSON.stringify(vercelConfig, null, 2)
);

// Build the app
console.log('Building the application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  
  // Create _redirects file in dist directory
  const distDir = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(distDir, '_redirects'),
    '/* /index.html 200'
  );
  
  console.log('Vercel build process completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
