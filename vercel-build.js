const { execSync } = require('child_process');

console.log('Running vercel-build script...');

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Build the app
console.log('Building the app...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Build completed successfully!');
