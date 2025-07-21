/**
 * Компонент модального окна для просмотра изображений в полном размере
 * Поддерживает навигацию между изображениями и закрытие по клавише Escape
 * Выполнен в элегантном классическом стиле
 */
import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface ImageModalProps {
  /** Список изображений для отображения */
  images: { src: string; alt: string }[];
  /** Индекс текущего изображения */
  currentIndex: number;
  /** Флаг открытости модального окна */
  isOpen: boolean;
  /** Функция закрытия модального окна */
  onClose: () => void;
  /** Функция для перехода к предыдущему изображению */
  onPrevious: () => void;
  /** Функция для перехода к следующему изображению */
  onNext: () => void;
}

export default function ImageModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext
}: ImageModalProps) {
  /**
   * Обработка нажатий клавиш для навигации
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);

  if (!isOpen || !images[currentIndex]) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* Декоративная рамка */}
      <div className="absolute inset-4 border border-amber-400/30 rounded-lg pointer-events-none animate-slide-in"></div>
      
      {/* Кнопка закрытия */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 border-amber-300/50 text-white backdrop-blur-sm w-12 h-12 z-10 transition-all duration-300 hover:scale-110 bg-transparent"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Навигационные кнопки */}
      {images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-amber-300/50 text-white backdrop-blur-sm w-12 h-12 transition-all duration-300 hover:scale-110 bg-transparent"
            onClick={onPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-amber-300/50 text-white backdrop-blur-sm w-12 h-12 transition-all duration-300 hover:scale-110 bg-transparent"
            onClick={onNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Изображение */}
      <div className="max-w-6xl max-h-[85vh] w-full h-full flex items-center justify-center">
        <div className="relative animate-slide-in">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-300"
          />
          {/* Золотая рамка вокруг изображения */}
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 via-yellow-300/20 to-amber-400/20 rounded-lg -z-10"></div>
        </div>
      </div>

      {/* Информация об изображении */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        {images.length > 1 && (
          <div className="text-white/90 text-sm mb-2 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
            {currentIndex + 1} из {images.length}
          </div>
        )}
        <div className="text-white/70 text-sm italic max-w-md">
          {images[currentIndex].alt}
        </div>
      </div>

      {/* Миниатюры навигации */}
      {images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/30 p-2 rounded-lg backdrop-blur-sm">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-amber-400 scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-amber-300/70 hover:scale-110'
              }`}
              onClick={() => {
                const diff = index - currentIndex;
                if (diff > 0) {
                  for (let i = 0; i < diff; i++) onNext();
                } else {
                  for (let i = 0; i < Math.abs(diff); i++) onPrevious();
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
