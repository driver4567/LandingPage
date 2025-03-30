const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define the supported languages
const languages = ['en', 'es', 'fr', 'de', 'ja'];

// First build the application
console.log('Building application...');
execSync('npm run build', { stdio: 'inherit' });

const distDir = path.resolve(__dirname, '../dist');
const publicDir = path.resolve(distDir, 'public');

if (!fs.existsSync(publicDir)) {
  console.error('Error: public directory not found after build');
  process.exit(1);
}

// Read the index.html file
const indexPath = path.join(publicDir, 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Create language-specific HTML files
console.log('Generating language-specific HTML files...');
languages.forEach(lang => {
  // Create a modified version of index.html with the lang attribute set
  const langContent = indexContent.replace('<html lang="en">', `<html lang="${lang}">`);
  
  // Add language meta tag
  const headEndPos = langContent.indexOf('</head>');
  const modifiedContent = langContent.slice(0, headEndPos) + 
    `\n  <meta name="language" content="${lang}">\n  ` +
    langContent.slice(headEndPos);
  
  // Write the language-specific file
  fs.writeFileSync(path.join(publicDir, `index.${lang}.html`), modifiedContent);
  console.log(`Created index.${lang}.html`);
});

// Create a simple router file to handle language detection
const routerContent = `
// Simple client-side router for language handling
(function() {
  // Detect user's preferred language
  function detectLanguage() {
    const supportedLanguages = ['en', 'es', 'fr', 'de', 'ja'];
    
    // Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && supportedLanguages.includes(langParam)) {
      return langParam;
    }
    
    // Then check navigator language
    const navLang = navigator.language.split('-')[0];
    if (supportedLanguages.includes(navLang)) {
      return navLang;
    }
    
    // Default to English
    return 'en';
  }
  
  // Redirect to the appropriate language file if needed
  function routeToLanguage() {
    const currentPath = window.location.pathname;
    
    // Don't redirect if already on a language-specific page
    if (currentPath.match(/\\/index\\.[a-z]{2}\\.html$/)) {
      return;
    }
    
    const detectedLang = detectLanguage();
    
    // Only redirect if not on the correct language page
    if (detectedLang !== 'en' && currentPath === '/index.html' || currentPath === '/') {
      const newUrl = window.location.origin + '/index.' + detectedLang + '.html' + window.location.search;
      window.location.href = newUrl;
    }
  }
  
  // Run on page load
  routeToLanguage();
})();
`;

// Write the router file
fs.writeFileSync(path.join(publicDir, 'language-router.js'), routerContent);
console.log('Created language-router.js');

// Modify the main index.html to include the router script
const updatedIndexContent = indexContent.replace('</head>', 
  '<script src="/language-router.js"></script>\n</head>');
fs.writeFileSync(indexPath, updatedIndexContent);

console.log('Static site generation completed successfully!');