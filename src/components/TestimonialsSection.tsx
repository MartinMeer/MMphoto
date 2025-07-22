/**
 * Компонент секции отзывов клиентов
 * Отображает отзывы с фотографиями, именами и оценками в изысканном классическом стиле
 */
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Данные отзывов
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Елена Морозова",
      avatar: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/de1a7383-7991-462b-af97-d05c5b08bee3.jpg",
      rating: 5,
      text: "Марина - истинный мастер своего дела. Наша семейная фотосессия превратилась в настоящий праздник. Каждый кадр пропитан теплотой и любовью. Дети чувствовали себя как в сказке, а результат превзошел все наши ожидания.",
      service: "Семейная фотосессия",
      date: "Декабрь 2024"
    },
    {
      id: 2,
      name: "Мария и Александр Романовы",
      avatar: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/c227c69f-5ded-4b54-859c-e2329dd3a80d.jpg",
      rating: 5,
      text: "Наше венчание было запечатлено с необычайной деликатностью и художественным вкусом. Марина смогла передать всю торжественность и святость момента. Эти фотографии стали настоящей семейной реликвией.",
      service: "Церемония венчания",
      date: "Ноябрь 2024"
    },
    {
      id: 3,
      name: "Ольга Петрова",
      avatar: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/c9867f97-7e5d-4ffd-809a-f4abfa4bb7c0.jpg",
      rating: 5,
      text: "Фотосессия в ожидании малыша стала одним из самых волнительных событий. Марина создала атмосферу невероятной нежности и красоты. Каждый снимок - это произведение искусства, полное материнской любви.",
      service: "Фотосессия беременности",
      date: "Октябрь 2024"
    },
    {
      id: 4,
      name: "Татьяна Смирнова",
      avatar: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/68ed8e6d-07f4-41d3-b2b7-c9c73a4f7b23.jpg",
      rating: 5,
      text: "Индивидуальная съемка для обновления портфолио превзошла все ожидания. Марина обладает уникальным даром видеть красоту в каждом человеке. Профессионализм высочайшего класса и безупречный вкус.",
      service: "Индивидуальная фотосессия",
      date: "Сентябрь 2024"
    },
    {
      id: 5,
      name: "Дмитрий и Анастасия Волковы",
      avatar: "https://pub-cdn.sider.ai/u/U0GVH7028Y5/web-coder/687eaf091acf42c15ca4b8a1/resource/bbcd9280-4f02-441e-ab94-889b3fb4d767.jpg",
      rating: 5,
      text: "Выбор фотографа для семейной съемки был очень важным для нас. Марина оказалась именно тем художником, который смог передать душу нашей семьи. Работает с особым трепетом и вниманием к деталям.",
      service: "Семейная фотосессия",
      date: "Август 2024"
    }
  ];

  /**
   * Переход к следующему отзыву
   */
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  /**
   * Переход к предыдущему отзыву
   */
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  /**
   * Автопрокрутка отзывов
   */
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(nextTestimonial, 6000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay]);

  /**
   * Рендер звезд рейтинга
   */
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 transition-colors duration-200 ${
          index < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-white" style={{ fontFamily: 'serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-yellow-600"></div>
            <span className="text-amber-700 tracking-widest uppercase text-sm font-semibold">Отзывы клиентов</span>
            <div className="w-16 h-px bg-gradient-to-l from-amber-400 to-yellow-600"></div>
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-6 tracking-wide">
            Голоса доверия
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed tracking-wide">
            Истории тех, кто доверил мне свои самые дорогие и значимые моменты
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Card 
            className="shadow-2xl overflow-hidden border border-amber-100 bg-gradient-to-br from-white via-amber-50/30 to-white transition-all duration-500 hover:shadow-3xl"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            <CardContent className="p-12 md:p-16">
              <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
                {/* Аватар */}
                <div className="flex-shrink-0">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100 transition-transform duration-300 hover:scale-105">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </div>

                {/* Содержание отзыва */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                  
                  <blockquote className="text-xl text-gray-700 italic mb-6 leading-relaxed tracking-wide transition-opacity duration-300">
                    "{testimonials[currentIndex].text}"
                  </blockquote>
                  
                  <div className="space-y-2">
                    <div className="font-bold text-gray-800 text-xl tracking-wide transition-colors duration-200 hover:text-amber-700">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-amber-700 font-semibold tracking-wide">
                      {testimonials[currentIndex].service}
                    </div>
                    <div className="text-sm text-gray-500 tracking-wider">
                      {testimonials[currentIndex].date}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Навигационные кнопки */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-full bg-white shadow-2xl hover:shadow-3xl hover:bg-amber-50 border-amber-200 w-14 h-14 transition-all duration-300 hover:scale-110 bg-transparent"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-6 w-6 text-amber-700" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-full bg-white shadow-2xl hover:shadow-3xl hover:bg-amber-50 border-amber-200 w-14 h-14 transition-all duration-300 hover:scale-110 bg-transparent"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-6 w-6 text-amber-700" />
          </Button>

          {/* Индикаторы */}
          <div className="flex justify-center space-x-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-600 scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-amber-300 shadow-sm'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 text-center">
          {[
            { value: "500+", label: "Довольных клиентов" },
            { value: "5.0", label: "Средняя оценка" },
            { value: "100%", label: "Рекомендуют друзьям" }
          ].map((stat, index) => (
            <div key={index} className="space-y-4 transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-yellow-600 mx-auto"></div>
              <div className="text-4xl font-bold text-amber-700 transition-colors duration-200 hover:text-amber-800">{stat.value}</div>
              <div className="text-gray-600 tracking-wide text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
