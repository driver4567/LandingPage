#!/bin/bash

# Script to generate a static site with optimized assets
# This script handles the full static site generation process

echo "Starting static site generation process..."

# Step 1: Build the application
echo "Building application..."
npm run build

# Verify the build was successful
if [ ! -d "./dist/public" ]; then
  echo "Error: Build failed - dist/public directory not found"
  exit 1
fi

# Step 2: Run optimization steps
echo "Optimizing static assets..."

# Create optimization directory
OPTIMIZE_DIR="./dist/optimize"
mkdir -p $OPTIMIZE_DIR

# Step 3: Generate language-specific HTML files
echo "Generating language-specific HTML files..."
node scripts/generate-static.js

# Step 4: Run prerender optimizations
echo "Running prerender optimizations..."
node scripts/prerender.js

echo "Static site generation completed successfully!"
echo "The optimized files are available in the dist/public directory."
echo ""
echo "To deploy the static site:"
echo "1. The files in dist/public can be served from any static hosting service"
echo "2. For best performance, enable GZIP/Brotli compression on your server"
echo "3. Set appropriate cache headers for different file types"