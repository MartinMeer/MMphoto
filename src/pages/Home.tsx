/**
 * Главная страница сайта фотографа
 * Содержит все основные разделы: Обо мне, Портфолио, Услуги, Контакты
 * Включает интерактивную галерею, календарь бронирования и отзывы клиентов
 */
import React, { useState, useEffect } from 'react';
import { Camera, Heart, Baby, Church, Mail, Phone, Instagram, MapPin, Award, Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import ImageModal from '../components/ImageModal';
import BookingCalendar from '../components/BookingCalendar';
import TestimonialsSection from '../components/TestimonialsSection';

// Import local images
import heroImage from '../assets/images/hero/hero-main.jpg';
import logoUfcp from '../assets/images/logo/logo-ufcp.svg';

export default function Home() {
  // Состояние для модального окна галереи
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Состояние мобильного меню
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Данные для галереи
  const galleryImages = [
    { src: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/021a10d0-a98a-4283-bb0e-390974bca04f.jpg", alt: "Счастливая семья на природе" },
    { src: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/173e13b0-7cc5-4057-9c2c-8891589b0d8d.jpg", alt: "Церемония венчания в храме" },
    { src: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/339107e3-5925-4f38-b658-8844d2019681.jpg", alt: "Фотосессия беременной женщины" },
    { src: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/601749de-d6f3-4f74-b0c0-73ed7a967b9c.jpg", alt: "Семья играет вместе" },
    { src: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/117e2567-3d35-4304-b647-4b3f1356e25a.jpg", alt: "Обмен обручальными кольцами" },
    { src: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/359435c6-5142-42a2-b541-fed2431939a2.jpg", alt: "Силуэт беременной на закате" },
    { src: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/7394dbd9-d986-49bc-9772-5051aab50c9b.jpg", alt: "Смеющиеся дети" },
    { src: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/4882c0a7-49f7-43f1-ad40-66ff5b80b012.jpg", alt: "Портрет пары" },
    { src: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/6c3d6aa8-ace1-46a4-8843-de444b9ce9dc.jpg", alt: "Фотография животика" },
    { src: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/82235fa9-69fb-494f-a3a7-ded7f2b0151f.jpg", alt: "Семейные объятия" },
    { src: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/64d6af92-65c8-48d1-8a77-09093fe83f3e.jpg", alt: "Поцелуй молодоженов" },
    { src: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/49ce27ad-acc3-4348-b9f5-4f0346885ff2.jpg", alt: "Сияние материнства" }
  ];

  /**
   * Открытие модального окна с изображением
   */
  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  /**
   * Закрытие модального окна
   */
  const closeImageModal = () => {
    setIsModalOpen(false);
  };

  /**
   * Переход к предыдущему изображению
   */
  const goToPrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  /**
   * Переход к следующему изображению
   */
  const goToNext = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % galleryImages.length
    );
  };

  /**
   * Плавная прокрутка к разделу
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  /**
   * Анимация появления элементов при скролле
   */
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    // Наблюдаем за всеми анимируемыми элементами
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  /**
   * Закрытие мобильного меню при клике вне его
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const menuButton = document.getElementById('mobile-menu-button');
      if (mobileMenu && !mobileMenu.contains(event.target as Node) && 
          menuButton && !menuButton.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-amber-50" style={{ fontFamily: 'serif' }}>
      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out;
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out;
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .mobile-menu-overlay {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-40 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-800 tracking-wide" style={{ fontFamily: 'serif' }}>Марина</span>
                <div className="text-sm text-amber-700 tracking-widest uppercase">Фотограф</div>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-10">
              {[
                { id: 'about', label: 'Обо мне' },
                { id: 'portfolio', label: 'Мое портфолио' },
                { id: 'services', label: 'Мои услуги' },
                { id: 'testimonials', label: 'Отзывы' },
                { id: 'contact', label: 'Контакты' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-amber-700 transition-colors text-lg tracking-wide hover:scale-105 transform transition-transform duration-200"
                  style={{ fontFamily: 'serif' }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              id="mobile-menu-button"
              variant="outline"
              size="icon"
              className="md:hidden bg-transparent border-amber-300 hover:bg-amber-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-amber-700" />
              ) : (
                <Menu className="h-6 w-6 text-amber-700" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mobile-menu-overlay">
            <div 
              id="mobile-menu" 
              className="bg-white/98 backdrop-blur-lg border-t border-amber-100 shadow-xl animate-slide-in-right"
            >
              <div className="px-4 py-6 space-y-4">
                {[
                  { id: 'about', label: 'Обо мне' },
                  { id: 'portfolio', label: 'Мое портфолио' },
                  { id: 'services', label: 'Мои услуги' },
                  { id: 'testimonials', label: 'Отзывы' },
                  { id: 'contact', label: 'Контакты' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-3 text-lg text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all duration-200 tracking-wide"
                    style={{ fontFamily: 'serif' }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 animate-on-scroll">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-yellow-600"></div>
                  <Award className="h-6 w-6 text-amber-600" />
                  <div className="w-16 h-px bg-gradient-to-l from-amber-400 to-yellow-600"></div>
                </div>
                <h1 className="text-6xl lg:text-7xl font-bold text-gray-800 leading-tight tracking-wide" style={{ fontFamily: 'serif' }}>
                  Искусство
                  <span className="block text-amber-700 italic">запечатлеть</span>
                  <span className="block text-gray-600">моменты</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed tracking-wide max-w-lg" style={{ fontFamily: 'serif', lineHeight: '1.8' }}>
                  С особым вниманием к деталям и глубоким пониманием человеческих эмоций, 
                  я создаю фотографии, которые становятся семейными реликвиями на долгие годы.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg tracking-wider transform hover:scale-105" 
                  style={{ fontFamily: 'serif' }}
                  onClick={() => scrollToSection('portfolio')}
                >
                  Посмотреть портфолио
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg tracking-wider transform hover:scale-105" 
                  style={{ fontFamily: 'serif' }}
                  onClick={() => scrollToSection('contact')}
                >
                  Связаться со мной
                </Button>
              </div>
            </div>
            <div className="relative animate-on-scroll">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <img
                  src={heroImage}
                  alt="Марина - профессиональный фотограф"
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-7 -left-7 bg-white rounded-full p-8 shadow-2xl border border-amber-100 w-32 h-32 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-700 mb-2" style={{ fontFamily: 'serif' }}>8+</div>
                  <div className="text-sm text-gray-600 tracking-wider uppercase">лет опыта</div>
                  <div className="w-8 h-px bg-amber-400 mx-auto mt-2"></div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-amber-400/90 to-yellow-800/90 rounded-full p-6 shadow-xl text-white w-36 h-36">
                <div className="relative h-full">
                  {/* Logo in top-left corner */}
                  <img 
                    src={logoUfcp} 
                    alt="Логотип Союза Церковных Фотографов" 
                    className="w-16 h-12 absolute top-0 left-2"
                  />
                  {/* Text in three lines at bottom center */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-[10px] tracking-wider uppercase leading-medium">В Союзе</div>
                    <div className="text-[10px] tracking-wider uppercase leading-medium">Церковных Фотографов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-on-scroll">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-px bg-gradient-to-r from-amber-400 to-yellow-600"></div>
                  <span className="text-amber-700 tracking-widest uppercase text-sm font-semibold">Обо мне</span>
                  <div className="w-12 h-px bg-gradient-to-l from-amber-400 to-yellow-600"></div>
                </div>
                <h2 className="text-5xl font-bold text-gray-800 tracking-wide" style={{ fontFamily: 'serif' }}>
                  Философия моего творчества
                </h2>
              </div>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed tracking-wide" style={{ fontFamily: 'serif', lineHeight: '1.9' }}>
                <p>
                  Меня зовут Марина, и для меня фотография — это не просто профессия, а призвание. 
                  Восемь лет назад я впервые взяла в руки камеру и поняла, что нашла свой путь в жизни.
                </p>
                <p>
                  Каждая съемка для меня — это возможность рассказать уникальную историю. 
                  Я верю в силу момента, в красоту естественных эмоций и в магию человеческих отношений.
                </p>
                <p>
                  Мой подход основан на создании атмосферы доверия и комфорта, где каждый может быть собой. 
                  Использую профессиональное оборудование и авторские техники обработки.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-amber-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700 mb-2" style={{ fontFamily: 'serif' }}>8</div>
                  <div className="text-sm text-gray-600 tracking-wider uppercase">лет мастерства</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700 mb-2" style={{ fontFamily: 'serif' }}>500+</div>
                  <div className="text-sm text-gray-600 tracking-wider uppercase">съемок</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700 mb-2" style={{ fontFamily: 'serif' }}>100%</div>
                  <div className="text-sm text-gray-600 tracking-wider uppercase">довольных клиентов</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 animate-on-scroll">
              <div className="space-y-6">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/6e04eef0-e3f6-4aee-aa9b-9f0ac603f92a.jpg"
                    alt="Фотограф за работой"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/1d30292b-8ae3-4a5a-90c4-3017413bf4fb.jpg"
                    alt="Профессиональное оборудование"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="pt-12 space-y-6">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/bf43aa47-4c97-4736-9089-c1a2925a1247.jpg"
                    alt="Фотостудия"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/d31f48f3-d419-458a-ae94-48655cfbd304.jpg"
                    alt="Обработка фотографий"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gradient-to-br from-amber-50 via-stone-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-yellow-600"></div>
              <span className="text-amber-700 tracking-widest uppercase text-sm font-semibold">Мое портфолио</span>
              <div className="w-16 h-px bg-gradient-to-l from-amber-400 to-yellow-600"></div>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6 tracking-wide" style={{ fontFamily: 'serif' }}>
              Коллекция моментов
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed tracking-wide" style={{ fontFamily: 'serif' }}>
              Каждая фотография — это история, рассказанная через призму искусства и эмоций
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {[
              {
                image: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/9d573aa3-6bda-4017-9a77-049ac4558f61.jpg",
                icon: Heart,
                title: "Семейные фотосессии",
                description: "Теплота семейного очага, искренние эмоции и безграничная любовь, запечатленные в каждом кадре"
              },
              {
                image: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/ef9c6e22-550b-49e9-8e4d-0a3bc653d9bd.jpg",
                icon: Church,
                title: "Церемонии венчания",
                description: "Священные моменты единения душ, торжественность обряда и божественная красота церемонии"
              },
              {
                image: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/5cff0c09-6eca-4815-bc6d-86f6f0ac7085.jpg",
                icon: Baby,
                title: "Фотосессии для беременных",
                description: "Трепетная красота материнства, нежность ожидания и волшебство предстоящего чуда"
              }
            ].map((item, index) => (
              <Card key={index} className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-amber-100 bg-white animate-on-scroll transform hover:scale-105">
                <div className="aspect-[4/5] overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 tracking-wide" style={{ fontFamily: 'serif' }}>{item.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed tracking-wide" style={{ fontFamily: 'serif' }}>
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Интерактивная галерея */}
          <div className="mb-8 animate-on-scroll">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-12 tracking-wide" style={{ fontFamily: 'serif' }}>
              Избранные работы
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {galleryImages.map((image, index) => (
                <div 
                  key={index}
                  className="aspect-square rounded-2xl overflow-hidden shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-amber-100 transform"
                  onClick={() => openImageModal(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-yellow-600"></div>
              <span className="text-amber-700 tracking-widest uppercase text-sm font-semibold">Мои услуги</span>
              <div className="w-16 h-px bg-gradient-to-l from-amber-400 to-yellow-600"></div>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6 tracking-wide" style={{ fontFamily: 'serif' }}>
              Индивидуальный подход
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed tracking-wide" style={{ fontFamily: 'serif' }}>
              Каждый клиент уникален, каждая история достойна особого внимания и профессионального мастерства
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Семейная фотосессия",
                description: "Полноценная семейная съемка с индивидуальным подходом",
                price: "от 12 000₽",
                features: [
                  "60+ обработанных фотографий",
                  "Все исходные файлы",
                  "Приватная онлайн галерея",
                  "Консультация по стилю",
                  "Съемка 2-3 часа"
                ]
              },
              {
                icon: Church,
                title: "Венчание",
                description: "Торжественная съемка священной церемонии",
                price: "от 18 000₽",
                features: [
                  "Съемка всей церемонии",
                  "100+ обработанных фото",
                  "Эксклюзивная фотокнига",
                  "Согласование с настоятелем",
                  "Репортажная съемка"
                ]
              },
              {
                icon: Baby,
                title: "Беременность",
                description: "Нежная съемка в ожидании чуда",
                price: "от 9 000₽",
                features: [
                  "50+ обработанных фото",
                  "Студия или природная локация",
                  "Эксклюзивный реквизит",
                  "Участие партнера",
                  "Индивидуальная стилистика"
                ]
              },
              {
                icon: Camera,
                title: "Индивидуальная",
                description: "Персональная съемка для идеальных портретов",
                price: "от 7 000₽",
                features: [
                  "40+ обработанных фото",
                  "Несколько образов",
                  "Профессиональный свет",
                  "Художественная ретушь",
                  "Креативная концепция"
                ]
              }
            ].map((service, index) => (
              <Card key={index} className="text-center p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-amber-50 border border-amber-100 animate-on-scroll transform">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <service.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 tracking-wide" style={{ fontFamily: 'serif' }}>{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed" style={{ fontFamily: 'serif' }}>
                  {service.description}
                </p>
                <div className="text-3xl font-bold text-amber-700 mb-6" style={{ fontFamily: 'serif' }}>{service.price}</div>
                <ul className="text-sm text-gray-600 space-y-2 text-left mb-6" style={{ fontFamily: 'serif' }}>
                  {service.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-amber-50 via-stone-50 to-amber-50 rounded-3xl p-10 text-center border border-amber-100 shadow-xl animate-on-scroll">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 tracking-wide" style={{ fontFamily: 'serif' }}>
              Дополнительные услуги премиум-класса
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 text-lg tracking-wide" style={{ fontFamily: 'serif' }}>Экспресс-обработка</h4>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'serif' }}>
                  Готовые фотографии высочайшего качества через 2-3 дня (+60% к стоимости)
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 text-lg tracking-wide" style={{ fontFamily: 'serif' }}>Эксклюзивная фотокнига</h4>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'serif' }}>
                  Авторский дизайн и печать премиум-качества (от 5000₽)
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 text-lg tracking-wide" style={{ fontFamily: 'serif' }}>Кинематографическая съемка</h4>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'serif' }}>
                  Художественный фильм о вашем событии (от 25000₽)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <div className="animate-on-scroll">
          <TestimonialsSection />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-amber-50 via-stone-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-yellow-600"></div>
              <span className="text-amber-700 tracking-widest uppercase text-sm font-semibold">Контакты</span>
              <div className="w-16 h-px bg-gradient-to-l from-amber-400 to-yellow-600"></div>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6 tracking-wide" style={{ fontFamily: 'serif' }}>
              Начнем сотрудничество
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed tracking-wide" style={{ fontFamily: 'serif' }}>
              Свяжитесь со мной, чтобы обсудить детали вашей особенной фотосессии
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div className="space-y-10 animate-on-scroll">
              {[
                { icon: Phone, label: "Телефон", value: "+7 (999) 123-45-67" },
                { icon: Mail, label: "Email", value: "marina@photographer.ru" },
                { icon: Instagram, label: "Instagram", value: "@marina_photographer" },
                { icon: MapPin, label: "Локация", value: "Москва и Московская область" }
              ].map((contact, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                    <contact.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-lg tracking-wide" style={{ fontFamily: 'serif' }}>{contact.label}</div>
                    <div className="text-gray-600 text-xl" style={{ fontFamily: 'serif' }}>{contact.value}</div>
                  </div>
                </div>
              ))}

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-amber-100">
                <h3 className="font-semibold text-gray-800 mb-6 text-xl tracking-wide" style={{ fontFamily: 'serif' }}>Время работы</h3>
                <div className="space-y-4 text-gray-600" style={{ fontFamily: 'serif' }}>
                  <div className="flex justify-between items-center">
                    <span>Понедельник - Пятница</span>
                    <span className="font-semibold">10:00 - 20:00</span>
                  </div>
                  <div className="w-full h-px bg-amber-100"></div>
                  <div className="flex justify-between items-center">
                    <span>Суббота - Воскресенье</span>
                    <span className="font-semibold">9:00 - 22:00</span>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-10 shadow-2xl bg-white border border-amber-100 animate-on-scroll transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 tracking-wide" style={{ fontFamily: 'serif' }}>
                Записаться на консультацию
              </h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 tracking-wide" style={{ fontFamily: 'serif' }}>
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-4 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm transition-all duration-200"
                    placeholder="Как к вам обращаться?"
                    style={{ fontFamily: 'serif' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 tracking-wide" style={{ fontFamily: 'serif' }}>
                    Телефон
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-4 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm transition-all duration-200"
                    placeholder="+7 (999) 123-45-67"
                    style={{ fontFamily: 'serif' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 tracking-wide" style={{ fontFamily: 'serif' }}>
                    Тип фотосессии
                  </label>
                  <select className="w-full px-4 py-4 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm transition-all duration-200" style={{ fontFamily: 'serif' }}>
                    <option>Выберите тип фотосессии</option>
                    <option>Семейная фотосессия</option>
                    <option>Венчание</option>
                    <option>Беременность</option>
                    <option>Индивидуальная</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 tracking-wide" style={{ fontFamily: 'serif' }}>
                    Ваши пожелания
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-4 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm transition-all duration-200"
                    placeholder="Расскажите о ваших идеях и пожеланиях..."
                    style={{ fontFamily: 'serif' }}
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 tracking-wider transform hover:scale-105" style={{ fontFamily: 'serif' }}>
                  Отправить заявку
                </Button>
              </form>
            </Card>
          </div>

          {/* Календарь бронирования */}
          <div className="max-w-5xl mx-auto animate-on-scroll">
            <BookingCalendar 
              onBookingSelect={(date, time) => {
                console.log(`Выбрана дата: ${date}, время: ${time}`);
              }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-wide" style={{ fontFamily: 'serif' }}>Марина</span>
                <div className="text-sm text-amber-400 tracking-widest uppercase">Фотограф</div>
              </div>
            </div>
            <div className="text-gray-400 text-center md:text-right" style={{ fontFamily: 'serif' }}>
              <p className="text-lg">© 2024 Все права защищены</p>
              <p className="text-sm italic tracking-wide">Искусство запечатлевать моменты, которые останутся навсегда</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Image Modal */}
      <ImageModal
        images={galleryImages}
        currentIndex={currentImageIndex}
        isOpen={isModalOpen}
        onClose={closeImageModal}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </div>
  );
}
