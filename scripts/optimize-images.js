import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directories
const inputDir = path.join(__dirname, '../public');
const outputDir = path.join(__dirname, '../public');

// Function to convert PNG to WebP
async function convertToWebP() {
  console.log('Optimizing images...');
  
  try {
    // Convert PNG images in the root public directory
    await imagemin([`${inputDir}/*.png`], {
      destination: outputDir,
      plugins: [
        imageminWebp({ quality: 80 })
      ]
    });
    
    // Convert PNG images in the projects directory
    await imagemin([`${inputDir}/projects/*.png`], {
      destination: path.join(outputDir, 'projects'),
      plugins: [
        imageminWebp({ quality: 80 })
      ]
    });
    
    console.log('Images optimized successfully!');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

convertToWebP();