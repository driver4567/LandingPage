const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { execSync } = require('child_process');

async function prerender() {
  // First build the app
  console.log('Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  const distDir = path.resolve(__dirname, '../dist');
  const publicDir = path.resolve(distDir, 'public');
  const indexPath = path.join(publicDir, 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.error('Error: index.html not found after build');
    process.exit(1);
  }
  
  // Read the index.html file
  const html = fs.readFileSync(indexPath, 'utf8');
  
  // Create a JSDOM instance to manipulate the HTML
  const dom = new JSDOM(html);
  const document = dom.window.document;
  
  // Add preload for key resources
  const head = document.querySelector('head');
  
  // Preload main CSS
  const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
  cssLinks.forEach(link => {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = link.href;
    preloadLink.as = 'style';
    head.appendChild(preloadLink);
  });
  
  // Preload main JS
  const scripts = document.querySelectorAll('script[src]');
  scripts.forEach(script => {
    const preloadScript = document.createElement('link');
    preloadScript.rel = 'preload';
    preloadScript.href = script.src;
    preloadScript.as = 'script';
    head.appendChild(preloadScript);
  });
  
  // Add meta tags for SEO
  const metaTags = [
    { name: 'description', content: 'PocketCompute - The revolutionary device that combines smartphone functionality with customizable hardware expansion.' },
    { name: 'keywords', content: 'PocketCompute, smartphone, hardware, expansion, custom device, smart device' },
    { property: 'og:title', content: 'PocketCompute - The Next Generation Smart Device' },
    { property: 'og:description', content: 'Introducing PocketCompute, the revolutionary device that combines smartphone functionality with customizable hardware expansion.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://pocketcompute.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'PocketCompute - The Next Generation Smart Device' },
    { name: 'twitter:description', content: 'The revolutionary device that combines smartphone functionality with customizable hardware expansion.' }
  ];
  
  metaTags.forEach(meta => {
    const metaTag = document.createElement('meta');
    Object.keys(meta).forEach(key => {
      metaTag.setAttribute(key, meta[key]);
    });
    head.appendChild(metaTag);
  });
  
  // Add structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'PocketCompute',
    'description': 'A revolutionary smart device that combines smartphone functionality with customizable hardware expansion.',
    'brand': {
      '@type': 'Brand',
      'name': 'PocketCompute'
    },
    'offers': {
      '@type': 'Offer',
      'price': '399.00',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/PreOrder'
    }
  };
  
  const scriptTag = document.createElement('script');
  scriptTag.type = 'application/ld+json';
  scriptTag.text = JSON.stringify(structuredData);
  head.appendChild(scriptTag);
  
  // Save the optimized HTML
  fs.writeFileSync(indexPath, dom.serialize());
  
  console.log('Static site generation and optimization completed!');
}

prerender().catch(error => {
  console.error('Error during prerendering:', error);
  process.exit(1);
});