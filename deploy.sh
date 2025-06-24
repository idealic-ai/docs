#!/bin/bash

# Exit on error
set -e

echo "Building documentation site..."
npm run build

echo "Creating .nojekyll file..."
touch dist/.nojekyll

echo "Copying README.md to dist directory..."
cp README.md dist/

echo "Done! Now you can manually push the dist directory to the gh-pages branch."
