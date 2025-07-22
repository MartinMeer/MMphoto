/**
 * Image utilities for MMphoto website
 * Provides helper functions for managing local images
 */

export interface ImageData {
  src: string;
  alt: string;
  category?: string;
  featured?: boolean;
}

export interface GalleryCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

/**
 * Gallery categories configuration
 */
export const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    id: 'family',
    name: 'Семейные фотосессии',
    description: 'Теплота семейного очага, искренние эмоции и безграничная любовь',
    icon: 'heart'
  },
  {
    id: 'baptism',
    name: 'Съемки таинства Крещения',
    description: 'Священные моменты единения душ, торжественность обряда',
    icon: 'church'
  },
  {
    id: 'children',
    name: 'Детские фотосессии',
    description: 'Невинность детства, радость и любопытство',
    icon: 'baby'
  },
  {
    id: 'ch-wedding',
    name: 'Свадебные фотосессии',
    description: 'Романтические моменты, любовь и торжество',
    icon: 'heart'
  }
];

/**
 * Helper function to import images dynamically
 * This will be useful when switching from external URLs to local images
 */
export const importImage = (path: string): string => {
  try {
    // For now, return the path as-is
    // When you add local images, you can import them here
    return path;
  } catch (error) {
    console.error(`Failed to import image: ${path}`, error);
    return path;
  }
};

/**
 * Get images by category
 */
export const getImagesByCategory = (images: ImageData[], category: string): ImageData[] => {
  return images.filter(img => img.category === category);
};

/**
 * Get featured images
 */
export const getFeaturedImages = (images: ImageData[]): ImageData[] => {
  return images.filter(img => img.featured);
};

/**
 * Generate image alt text if not provided
 */
export const generateAltText = (filename: string, category?: string): string => {
  const name = filename.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, '');
  if (category) {
    return `${category} - ${name}`;
  }
  return name;
};

/**
 * Image optimization helpers
 */
export const imageUtils = {
  /**
   * Get optimized image URL (for future use with backend)
   */
  getOptimizedUrl: (originalUrl: string, width?: number, height?: number): string => {
    if (width && height) {
      // When backend is implemented, this will return optimized URLs
      return `${originalUrl}?w=${width}&h=${height}`;
    }
    return originalUrl;
  },

  /**
   * Get thumbnail URL
   */
  getThumbnailUrl: (originalUrl: string): string => {
    return imageUtils.getOptimizedUrl(originalUrl, 400, 300);
  },

  /**
   * Get hero image URL
   */
  getHeroUrl: (originalUrl: string): string => {
    return imageUtils.getOptimizedUrl(originalUrl, 1920, 1080);
  }
};

/**
 * Sample image data structure for local images
 * Replace these with your actual local images when ready
 */
export const SAMPLE_LOCAL_IMAGES: ImageData[] = [
  // Family images
  {
    src: '/src/assets/images/gallery/family/family-session-001.jpg',
    alt: 'Счастливая семья на природе',
    category: 'family',
    featured: true
  },
  {
    src: '/src/assets/images/gallery/family/family-session-002.jpg',
    alt: 'Семья играет вместе',
    category: 'family',
    featured: false
  },
  
  // Baptism images
  {
    src: '/src/assets/images/gallery/baptism/baptism-ceremony-001.jpg',
    alt: 'Церемония крещения в храме',
    category: 'baptism',
    featured: true
  },
  {
    src: '/src/assets/images/gallery/baptism/baptism-ceremony-002.jpg',
    alt: 'Таинство крещения',
    category: 'baptism',
    featured: false
  },
  
  // Children images
  {
    src: '/src/assets/images/gallery/children/children-session-001.jpg',
    alt: 'Детская фотосессия',
    category: 'children',
    featured: true
  },
  {
    src: '/src/assets/images/gallery/children/children-session-002.jpg',
    alt: 'Смеющиеся дети',
    category: 'children',
    featured: false
  },
  
  // Wedding images
  {
    src: '/src/assets/images/gallery/ch-wedding/wedding-ceremony-001.jpg',
    alt: 'Свадебная церемония',
    category: 'ch-wedding',
    featured: true
  },
  {
    src: '/src/assets/images/gallery/ch-wedding/wedding-ceremony-002.jpg',
    alt: 'Молодожены',
    category: 'ch-wedding',
    featured: false
  }
];

/**
 * Migration helper: Convert external URLs to local images
 */
export const migrateToLocalImages = (externalImages: ImageData[]): ImageData[] => {
  return externalImages.map((img, index) => {
    // Map external URLs to local paths
    // You'll need to download the images and place them in the appropriate folders
    const localPath = `/src/assets/images/gallery/${getCategoryFromUrl(img.src)}/image-${index + 1}.jpg`;
    
    return {
      ...img,
      src: localPath
    };
  });
};

/**
 * Helper to determine category from URL (for migration)
 */
const getCategoryFromUrl = (url: string): string => {
  if (url.includes('family')) return 'family';
  if (url.includes('baptism') || url.includes('church')) return 'baptism';
  if (url.includes('children') || url.includes('baby')) return 'children';
  if (url.includes('ch-wedding') || url.includes('wedding')) return 'ch-wedding';
  return 'family'; // default
}; 