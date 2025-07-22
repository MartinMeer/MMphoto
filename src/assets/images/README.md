# Image Assets Directory

This directory contains all image assets for the MMphoto website.

## Directory Structure

```
src/assets/images/
├── gallery/
│   ├── family/          # Family photography images
│   ├── wedding/         # Wedding photography images
│   └── pregnancy/       # Maternity photography images
├── hero/                # Hero section images
├── about/               # About section images
└── logo/                # Logo and branding images
```

## Image Guidelines

### Supported Formats
- **JPG/JPEG** - For photographs (recommended)
- **PNG** - For images with transparency
- **WebP** - Modern format with better compression
- **SVG** - For logos and icons

### Recommended Sizes
- **Hero images**: 1920x1080px or larger
- **Gallery images**: 1200x800px (4:3 ratio)
- **Thumbnails**: 400x300px
- **About images**: 800x600px

### Naming Convention
Use descriptive names with hyphens:
- `family-session-001.jpg`
- `wedding-ceremony-001.jpg`
- `pregnancy-outdoor-001.jpg`
- `hero-main-photographer.jpg`

## How to Add Images

1. Place your images in the appropriate category folder
2. Import them in your React component:

```javascript
import familyImage1 from '../assets/images/gallery/family/family-session-001.jpg';
import weddingImage1 from '../assets/images/gallery/wedding/wedding-ceremony-001.jpg';

const galleryImages = [
  { src: familyImage1, alt: "Happy family outdoors" },
  { src: weddingImage1, alt: "Wedding ceremony" },
];
```

## Optimization Tips

- Compress images before adding them (use tools like TinyPNG)
- Use appropriate formats (JPG for photos, PNG for graphics)
- Consider using WebP for better performance
- Keep file sizes under 500KB for web optimization

## Future Backend Integration

When the Java backend is implemented, images will be:
- Stored in the database or file system
- Served via API endpoints
- Managed through the admin panel
- Automatically optimized and resized 