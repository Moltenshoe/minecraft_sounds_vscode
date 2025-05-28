#!/bin/bash

echo "🔁 Swapping README for VS Code packaging..."

cp README-extension.md README.md

echo "📦 Packaging extension..."
npx vsce package

echo "♻️ Restoring original README..."
git restore README.md

echo "✅ Done."
