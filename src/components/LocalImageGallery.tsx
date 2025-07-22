import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Heart, Church, Baby } from 'lucide-react';
import { 
  ImageData, 
  GALLERY_CATEGORIES, 
  getImagesByCategory, 
  getFeaturedImages 
} from '../lib/imageUtils';

interface LocalImageGalleryProps {
  images: ImageData[];
  onImageClick?: (index: number) => void;
}

export default function LocalImageGallery({ images, onImageClick }: LocalImageGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFeatured, setShowFeatured] = useState<boolean>(false);

  // Filter images based on selection
  const filteredImages = showFeatured 
    ? getFeaturedImages(images)
    : selectedCategory === 'all' 
      ? images 
      : getImagesByCategory(images, selectedCategory);

  const handleImageClick = (index: number) => {
    if (onImageClick) {
      onImageClick(index);
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'family': return <Heart className="h-4 w-4" />;
      case 'baptism': return <Church className="h-4 w-4" />;
      case 'children': return <Baby className="h-4 w-4" />;
      case 'ch-wedding': return <Heart className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          variant={selectedCategory === 'all' && !showFeatured ? 'default' : 'outline'}
          onClick={() => {
            setSelectedCategory('all');
            setShowFeatured(false);
          }}
          className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white"
        >
          Все работы
        </Button>
        
        <Button
          variant={showFeatured ? 'default' : 'outline'}
          onClick={() => {
            setShowFeatured(true);
            setSelectedCategory('all');
          }}
          className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white"
        >
          Избранное
        </Button>

        {GALLERY_CATEGORIES.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id && !showFeatured ? 'default' : 'outline'}
            onClick={() => {
              setSelectedCategory(category.id);
              setShowFeatured(false);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white"
          >
            {getCategoryIcon(category.id)}
            {category.name}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image, index) => (
          <Card 
            key={index} 
            className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-amber-100 bg-white transform hover:scale-105 cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <div className="aspect-[4/5] overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  // Fallback for missing images
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzE4NS4wNDcgMTUwIDE3MyAxMzcuOTUzIDE3MyAxMjNDMTczIDEwOC4wNDcgMTg1LjA0NyA5NiAyMDAgOTZDMjE0Ljk1MyA5NiAyMjcgMTA4LjA0NyAyMjcgMTIzQzIyNyAxMzcuOTUzIDIxNC45NTMgMTUwIDIwMCAxNTBaIiBmaWxsPSIjRDREOUU2Ii8+CjxwYXRoIGQ9Ik0xNzMgMjA0QzE3MyAxODkuMDQ3IDE4NS4wNDcgMTc3IDIwMCAxNzdDMjE0Ljk1MyAxNzcgMjI3IDE4OS4wNDcgMjI3IDIwNEMyMjcgMjE4Ljk1MyAyMTQuOTUzIDIzMSAyMDAgMjMxQzE4NS4wNDcgMjMxIDE3MyAyMTguOTUzIDE3MyAyMDRaIiBmaWxsPSIjRDREOUU2Ii8+Cjwvc3ZnPgo=';
                }}
              />
              {image.featured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Избранное
                </div>
              )}
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'serif' }}>
                {image.alt}
              </h3>
              {image.category && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {getCategoryIcon(image.category)}
                  <span style={{ fontFamily: 'serif' }}>
                    {GALLERY_CATEGORIES.find(cat => cat.id === image.category)?.name}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg" style={{ fontFamily: 'serif' }}>
            {showFeatured 
              ? 'Избранные работы появятся здесь' 
              : 'Изображения для выбранной категории появятся здесь'
            }
          </div>
          <p className="text-gray-400 mt-2" style={{ fontFamily: 'serif' }}>
            Добавьте изображения в соответствующие папки
          </p>
        </div>
      )}
    </div>
  );
} 