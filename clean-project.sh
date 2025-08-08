#!/bin/bash

echo "🔄 Starting clean-up..."

# Step 1: Remove Vite + AI-related clutter
rm -rf .github
rm -rf .vscode
rm -rf dist
rm -rf node_modules/.vite

# Step 2: Delete unnecessary image/logo or dummy files if unused
rm -f public/vite.svg
rm -f src/assets/react.svg

# Step 3: Remove leftover AI or helper components
rm -f src/components/ThemeSwitcher.jsx
rm -f src/components/Dummy.jsx
rm -f src/data/sample-data.js

# Step 4: Remove unwanted markdown/config files (adjust as needed)
rm -f CODE_OF_CONDUCT.md
rm -f CONTRIBUTING.md
rm -f LICENSE
rm -f vite.config.js

echo "✅ Clean-up complete. Please re-run 'npm install' if needed."
