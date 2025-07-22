#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Auto-load images from directories and update Home.tsx
 * This script scans the gallery directories and automatically adds all images
 */

const GALLERY_DIR = 'src/assets/images/gallery';
const HOME_TSX_PATH = 'src/pages/Home.tsx';

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

/**
 * Get all images from a directory recursively
 */
function getImagesFromDirectory(dirPath) {
  const images = [];
  
  if (!fs.existsSync(dirPath)) {
    return images;
  }
  
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively scan subdirectories
      images.push(...getImagesFromDirectory(filePath));
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        images.push({
          path: filePath,
          relativePath: path.relative('src', filePath),
          filename: path.basename(file, ext),
          category: path.basename(dirPath)
        });
      }
    }
  }
  
  return images;
}

/**
 * Generate import statements for images
 */
function generateImports(images) {
  return images.map(img => {
    const importName = img.filename.replace(/[^a-zA-Z0-9]/g, '_');
    return `import ${importName} from '../${img.relativePath}';`;
  }).join('\n');
}

/**
 * Generate gallery array entries
 */
function generateGalleryEntries(images) {
  return images.map(img => {
    const importName = img.filename.replace(/[^a-zA-Z0-9]/g, '_');
    const altText = img.filename.replace(/[-_]/g, ' ');
    return `    { src: ${importName}, alt: "${altText}", category: "${img.category}" }`;
  }).join(',\n');
}

/**
 * Update Home.tsx with local images
 */
function updateHomeTsx(images) {
  if (images.length === 0) {
    console.log('❌ No images found in gallery directories');
    console.log('📁 Please add some images to:');
    console.log('   - src/assets/images/gallery/family/');
    console.log('   - src/assets/images/gallery/baptism/');
    console.log('   - src/assets/images/gallery/children/');
    console.log('   - src/assets/images/gallery/ch-wedding/');
    return;
  }
  
  let content = fs.readFileSync(HOME_TSX_PATH, 'utf8');
  
  // Generate imports
  const imports = generateImports(images);
  
  // Add imports after existing imports
  const importIndex = content.indexOf('// Import local images');
  if (importIndex !== -1) {
    const nextLineIndex = content.indexOf('\n', importIndex) + 1;
    content = content.slice(0, nextLineIndex) + imports + '\n' + content.slice(nextLineIndex);
  }
  
  // Replace gallery array
  const galleryEntries = generateGalleryEntries(images);
  const galleryStart = content.indexOf('const galleryImages = [');
  const galleryEnd = content.indexOf('];', galleryStart);
  
  if (galleryStart !== -1 && galleryEnd !== -1) {
    const beforeGallery = content.slice(0, galleryStart + 'const galleryImages = ['.length);
    const afterGallery = content.slice(galleryEnd);
    content = beforeGallery + '\n' + galleryEntries + '\n' + afterGallery;
  }
  
  // Write back to file
  fs.writeFileSync(HOME_TSX_PATH, content);
  
  console.log('✅ Successfully updated Home.tsx with local images!');
  console.log(`📸 Added ${images.length} images:`);
  images.forEach(img => {
    console.log(`   - ${img.relativePath} (${img.category})`);
  });
  console.log('🔄 Restart your dev server to see changes');
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Scanning gallery directories...');
  
  const categories = ['family', 'baptism', 'children', 'ch-wedding'];
  const allImages = [];
  
  for (const category of categories) {
    const categoryPath = path.join(GALLERY_DIR, category);
    const images = getImagesFromDirectory(categoryPath);
    allImages.push(...images);
  }
  
  updateHomeTsx(allImages);
}

// Run the script
main(); 