const express = require('express');
const path = require('path');
const compression = require('compression');
const fs = require('fs');

// Create a new express app
const app = express();

// Enable compression for all responses
app.use(compression());

// Define the directory where your static files are located
const publicDir = path.join(__dirname, '../dist/public');

// Check if the directory exists
if (!fs.existsSync(publicDir)) {
  console.error(`Error: Public directory not found at ${publicDir}`);
  console.error('Please run the static site generation script first with: npm run build && node scripts/generate-static.js');
  process.exit(1);
}

// Set cache headers for static assets
app.use(express.static(publicDir, {
  etag: true,
  lastModified: true,
  maxAge: '1d', // 1 day for most files
  setHeaders: (res, filePath) => {
    if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
      // Set longer cache for assets
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
    } else if (filePath.match(/\.html$/)) {
      // Set shorter cache for HTML
      res.setHeader('Cache-Control', 'public, max-age=0');
    }
  }
}));

// For any routes that don't match a static file, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Static server running at http://localhost:${PORT}`);
  console.log(`Serving files from: ${publicDir}`);
});