const fs = require('fs');
try {
  fs.copyFileSync('dist/index.html', 'dist/404.html');
  console.log('Copied index.html to dist/404.html');
} catch (err) {
  console.error('Failed to create 404.html:', err);
  process.exit(1);
}
