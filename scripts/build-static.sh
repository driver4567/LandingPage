#!/bin/bash

# Run both static site generation scripts in sequence
echo "Starting static site generation process..."

# Run the main prerender script first
echo "Step 1: Running prerender script..."
node scripts/prerender.js

# Then run the language-specific generation script
echo "Step 2: Running language-specific file generation..."
node scripts/generate-static.js

echo "Static site generation completed successfully!"
echo "The optimized files are available in the dist/public directory."