/**
 * Компонент календаря для бронирования фотосессий в элегантном классическом стиле
 * Показывает доступные даты и позволяет выбрать время с изысканным дизайном
 */
import React, { useState } from 'react';
import { Calendar, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface BookingCalendarProps {
  /** Callback при выборе даты и времени */
  onBookingSelect?: (date: string, time: string) => void;
}

export default function BookingCalendar({ onBookingSelect }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Генерация доступных дат (следующие 30 дней, исключая понедельники)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Исключаем понедельники (день отдыха)
      if (date.getDay() !== 1) {
        dates.push({
          date: date.toISOString().split('T')[0],
          displayDate: date.toLocaleDateString('ru-RU', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
          })
        });
      }
    }
    
    return dates.slice(0, 14); // Показываем 2 недели
  };

  const availableDates = generateAvailableDates();

  // Доступные временные слоты
  const timeSlots = [
    { time: '10:00', available: true },
    { time: '12:00', available: true },
    { time: '14:00', available: false },
    { time: '16:00', available: true },
    { time: '18:00', available: true },
    { time: '20:00', available: true }
  ];

  /**
   * Обработка выбора даты
   */
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(''); // Сброс времени при выборе новой даты
  };

  /**
   * Обработка выбора времени
   */
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (onBookingSelect && selectedDate) {
      onBookingSelect(selectedDate, time);
    }
  };

  return (
    <Card className="w-full shadow-2xl border border-amber-100 bg-gradient-to-br from-white via-amber-50/20 to-white transition-all duration-500 hover:shadow-3xl" style={{ fontFamily: 'serif' }}>
      <CardHeader className="pb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-px bg-gradient-to-r from-amber-400 to-yellow-600"></div>
          <Award className="h-5 w-5 text-amber-600" />
          <div className="w-12 h-px bg-gradient-to-l from-amber-400 to-yellow-600"></div>
        </div>
        <CardTitle className="flex items-center justify-center space-x-3 text-2xl text-gray-800 tracking-wide">
          <Calendar className="h-6 w-6 text-amber-600" />
          <span>Выберите идеальное время</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        {/* Выбор даты */}
        <div>
          <h4 className="font-bold text-gray-800 mb-6 text-xl tracking-wide">Доступные даты</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableDates.map((dateInfo) => (
              <Button
                key={dateInfo.date}
                variant={selectedDate === dateInfo.date ? "default" : "outline"}
                size="sm"
                className={`text-sm p-4 h-auto transition-all duration-300 transform hover:scale-105 ${
                  selectedDate === dateInfo.date 
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg' 
                    : 'hover:border-amber-400 hover:bg-amber-50 border-amber-200 text-gray-700 bg-transparent'
                }`}
                onClick={() => handleDateSelect(dateInfo.date)}
                style={{ fontFamily: 'serif' }}
              >
                {dateInfo.displayDate}
              </Button>
            ))}
          </div>
        </div>

        {/* Выбор времени */}
        {selectedDate && (
          <div className="transition-opacity duration-500 animate-fade-in">
            <h4 className="font-bold text-gray-800 mb-6 text-xl flex items-center space-x-3 tracking-wide">
              <Clock className="h-5 w-5 text-amber-600" />
              <span>Время для встречи</span>
            </h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.time}
                  variant={selectedTime === slot.time ? "default" : "outline"}
                  size="sm"
                  disabled={!slot.available}
                  className={`transition-all duration-300 transform hover:scale-105 ${
                    selectedTime === slot.time 
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg' 
                      : slot.available 
                        ? 'hover:border-amber-400 hover:bg-amber-50 border-amber-200 text-gray-700 bg-transparent' 
                        : 'opacity-40 cursor-not-allowed'
                  }`}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  style={{ fontFamily: 'serif' }}
                >
                  {slot.time}
                </Button>
              ))}
            </div>
            {!timeSlots.some(slot => slot.available) && (
              <p className="text-sm text-gray-500 mt-4 italic text-center">
                На выбранную дату все временные слоты заняты
              </p>
            )}
          </div>
        )}

        {/* Подтверждение выбора */}
        {selectedDate && selectedTime && (
          <div className="bg-gradient-to-r from-amber-50 to-stone-50 p-6 rounded-2xl border border-amber-100 shadow-lg transition-all duration-500 animate-fade-in">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-4 w-4 text-white" />
              </div>
              <h5 className="font-bold text-gray-800 text-lg tracking-wide">Ваш выбор</h5>
              <p className="text-gray-700">
                <strong>Дата:</strong> {availableDates.find(d => d.date === selectedDate)?.displayDate}
              </p>
              <p className="text-gray-700">
                <strong>Время:</strong> {selectedTime}
              </p>
              <p className="text-xs text-gray-500 italic mt-4 leading-relaxed">
                Заполните форму ниже, чтобы забронировать это время для вашей особенной фотосессии
              </p>
            </div>
          </div>
        )}

        {/* Информация о бронировании */}
        <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-lg transition-all duration-300 hover:shadow-xl">
          <h5 className="font-bold text-gray-800 mb-4 text-lg tracking-wide">Важная информация</h5>
          <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
            <p>• Понедельник — день творческого отдыха</p>
            <p>• Подтверждение бронирования в течение 2 часов</p>
            <p>• Возможна корректировка времени по взаимному согласию</p>
            <p>• Предоплата 30% для фиксации даты</p>
          </div>
        </div>
      </CardContent>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Card>
  );
}
