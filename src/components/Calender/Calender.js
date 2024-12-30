'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RightSection from './rightSection';
import Image from 'next/image';
import Logo from './logo';
import TimeWeather from './timeWeather';
import { getHinduCalendarData } from '@/services/hinduCalendar';
import { hindiTithi, hindiNakshatra } from '@/utils/hindiPanchang';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [today, setToday] = useState(new Date());
  const [hinduCalendarData, setHinduCalendarData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initCalendar = async () => {
      setIsLoading(true);
      try {
        const data = await getHinduCalendarData(
          `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`
        );
        setHinduCalendarData(data || {});
      } catch (error) {
        console.error('Error initializing calendar:', error);
      } finally {
        setIsLoading(false);
      }
    };
    initCalendar();
  }, [currentMonth, currentYear]);

  const months = [
    "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितम्बर", "अक्टूबर", "नवम्बर", "दिसम्बर",
  ];

  const occasions = [
    { date: '2024-01-15', name: 'मकर संक्रांति', description: 'सूर्य के उत्तरायण की शुरुआत' },
    { date: '2024-01-24', name: 'बसंत पंचमी', description: 'विद्या की देवी सरस्वती का पूजन' },
    // ... add other Hindu festivals with descriptions
  ];

  const renderCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay();
    const lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();

    let days = [];

    // Add previous month's last days
    for (let i = firstDayOfMonth; i > 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="lg:h-14 xl:h-24  2xl:h-32 md:h-16 flex items-start xl:text-5xl text-gray-400 md:text-3xl justify-center rounded-full cursor-pointer transition-all">
          {lastDateOfLastMonth - i + 1}
        </div>
      );
    }

    // Add current month's days
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const hinduData = hinduCalendarData[date];
      const isToday =
        today.getDate() === i &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear;

      days.push(
        <div
          key={`curr-${i}`}
          className={`min-h-[100px] p-1 flex flex-col items-stretch border border-yellow-100/50 rounded-lg 
            ${isToday ? 'bg-yellow-100/30' : 'hover:bg-yellow-50/20'} 
            transition-all cursor-pointer`}
          onClick={() => setSelectedDate({
            date,
            name: hinduData?.specialDay || 'पंचांग',
            description: `तिथि: ${hinduData?.thithi || ''}\nनक्षत्र: ${hinduData?.nakshatra || ''}\nयोग: ${hinduData?.yoga || ''}\nकरण: ${hinduData?.karana || ''}`
          })}
        >
          {/* Date number - top right */}
          <div className="flex justify-between items-start w-full">
            <div className={`text-sm md:text-base ${isToday ? 'font-bold' : ''}`}>
              {i}
            </div>
            {isToday && (
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            )}
          </div>

          {/* Tithi display */}
          <div className="text-[10px] md:text-xs text-center mt-1">
            {hinduData?.thithi && (
              <span className="bg-yellow-100/80 px-1 py-0.5 rounded-sm">
                {hinduData.thithi}
              </span>
            )}
          </div>

          {/* Special Day */}
          {hinduData?.specialDay && (
            <div className="text-[10px] md:text-xs text-center mt-auto">
              <span className="bg-red-100 px-1 py-0.5 rounded-full text-red-700 font-medium">
                {hinduData.specialDay}
              </span>
            </div>
          )}
        </div>
      );
    }

    // Add next month's first days
    for (let i = lastDayOfMonth; i < 6; i++) {
      days.push(
        <div key={`next-${i}`} className="lg:h-14 xl:h-24 2xl:h-32 md:h-16 flex items-start xl:text-5xl text-gray-400 md:text-3xl justify-center rounded-full cursor-pointer transition-all">
          {i - lastDayOfMonth + 1}
        </div>
      );
    }

    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
  };

  return (
    <div className="h-screen overflow-y-auto flex flex-col md:flex-row font-Montserrat">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="w-full md:w-1/2 md:h-screen p-6 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 md:overflow-y-auto relative">
            <div className="flex justify-between items-center md:mt-2 mb-6 md:mb-12">
              <button
                className="p-2 rounded-full bg-black text-white"
                onClick={handlePreviousMonth}
              >
                <ChevronLeft className="h-4 w-4 md:h-8 md:w-8" />
              </button>
              <h2 className="lg:text-5xl text-2xl text-center font-semibold text-black ">
                {months[currentMonth]} {currentYear}
              </h2>
              <button
                className="p-2 rounded-full bg-black text-white"
                onClick={handleNextMonth}
              >
                <ChevronRight className="h-4 w-4 md:h-8 md:w-8" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'].map((day) => (
                <div key={day} className="text-center font-bold text-black md:text-lg p-2">
                  {day}
                </div>
              ))}
              {renderCalendarDays()}
            </div>
            <div>
              <p className='text-center text-sm md:text-lg lg:text-2xl 2xl:text-3xl 3xl:text-4xl  md:font-bold'>बदलता मुरादाबाद, संवरता मुरादाबाद। <br />Creating Smart, Creating Better!</p>
            </div>
              <div className='block md:hidden w-full '>
              <TimeWeather />
              </div>
            
          </div>

          <RightSection selectedDate={selectedDate} currentMonth={currentMonth} />
        </>
      )}
    </div>
  );
};

export default Calendar;
