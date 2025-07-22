#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Simple script to add images to the gallery
 * Usage: node scripts/add-image.mjs "path/to/image.jpg" "Image description"
 */

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: node scripts/add-image.mjs "path/to/image.jpg" "Image description"');
  console.log('Example: node scripts/add-image.mjs "src/assets/images/gallery/family/family-001.jpg" "Happy family outdoors"');
  process.exit(1);
}

const [imagePath, description] = args;
const homeTsxPath = 'src/pages/Home.tsx';

try {
  // Read the current Home.tsx file
  let content = fs.readFileSync(homeTsxPath, 'utf8');
  
  // Create import statement
  const imageName = path.basename(imagePath, path.extname(imagePath));
  const importStatement = `import ${imageName} from '${imagePath.replace('src/', '../')}';`;
  
  // Add import if it doesn't exist
  if (!content.includes(importStatement)) {
    const importIndex = content.indexOf('// Import local images');
    if (importIndex !== -1) {
      const nextLineIndex = content.indexOf('\n', importIndex) + 1;
      content = content.slice(0, nextLineIndex) + importStatement + '\n' + content.slice(nextLineIndex);
    }
  }
  
  // Add to gallery array
  const galleryEntry = `    { src: ${imageName}, alt: "${description}" },`;
  
  // Find the galleryImages array and add the new entry
  const galleryStart = content.indexOf('const galleryImages = [');
  if (galleryStart !== -1) {
    const galleryEnd = content.indexOf('];', galleryStart);
    if (galleryEnd !== -1) {
      const beforeGallery = content.slice(0, galleryEnd);
      const afterGallery = content.slice(galleryEnd);
      content = beforeGallery + '\n' + galleryEntry + afterGallery;
    }
  }
  
  // Write back to file
  fs.writeFileSync(homeTsxPath, content);
  
  console.log('✅ Image added successfully!');
  console.log(`📸 Added: ${imagePath}`);
  console.log(`📝 Description: ${description}`);
  console.log('🔄 Restart your dev server to see changes');
  
} catch (error) {
  console.error('❌ Error adding image:', error.message);
  process.exit(1);
} 