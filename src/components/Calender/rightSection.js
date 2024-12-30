'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CirclePlay, Info, X } from 'lucide-react';
import Logo from './logo';
import { specialOccasions } from '../json/specialOcassion';
import { monthlyImages } from '../json/images';
import './style.css'
import monthlyContent from '../json/projectInfo';
import TimeWeather from './timeWeather';
import EventManager from './EventManager';

const RightSection = ({ selectedDate, currentMonth }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const [currentMonth] = useState(new Date().getMonth());
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [matchingOccasion, setMatchingOccasion] = useState(null);
  const [overlayContent, setOverlayContent] = useState(null);
  const [userEvents, setUserEvents] = useState([]);

  const handleOverlayClose = (content) => {
    setOverlayContent(null);
  }

  const handleAddEvent = (newEvent) => {
    setUserEvents(prev => [...prev, newEvent]);
    // You might want to store this in localStorage or a backend
    localStorage.setItem('userEvents', JSON.stringify([...userEvents, newEvent]));
  };

  useEffect(() => {
    // Load saved events
    const savedEvents = localStorage.getItem('userEvents');
    if (savedEvents) {
      setUserEvents(JSON.parse(savedEvents));
    }
  }, []);

  useEffect(() => {
    const foundOcassion = specialOccasions.find(
      (occasion) => selectedDate && selectedDate.date === occasion.date
    );

    if (foundOcassion) {
      setMatchingOccasion(foundOcassion);
      setOverlayVisible(true);
      console.log("Special Occasion:", foundOcassion);
    } else {
      setMatchingOccasion(null);
      setOverlayVisible(false);
      console.log("No special occasion today");
    }
  }, [selectedDate]);


  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Get images for the current month, fallback to January if not found
  const currentImages = monthlyImages[months[currentMonth]]?.length
    ? monthlyImages[months[currentMonth]]
    : monthlyImages.January;

  console.log("Current Images:", currentImages);

  // Update current image every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentImages.length]);


  const currentContent = monthlyContent[months[currentMonth]] || {
    name: 'No Information',
    info: 'No information available for this month',
    video: null,
  }

  return (
    <div onClick={() => {
      setOverlayVisible(false);
    }} className="md:w-1/2 relative h-screen bg-white shadow-lg flex flex-col flex-grow">
      {selectedDate && (
        <div className="absolute top-0 left-0 right-0 bg-white/20 backdrop-blur-lg p-4 z-10">
          <h2 className="text-2xl font-bold">
            {new Date(selectedDate.date).toLocaleDateString('hi-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </h2>
          <div className="mt-2 space-y-1">
            <p className="font-medium">{selectedDate.name}</p>
            <p className="text-sm whitespace-pre-line">{selectedDate.description}</p>
          </div>

          {/* Event Manager */}
          <EventManager
            date={selectedDate.date}
            onAddEvent={handleAddEvent}
          />

          {/* Display User Events */}
          {userEvents
            .filter(event => event.date === selectedDate.date)
            .map((event, index) => (
              <div key={index} className="mt-2 p-2 bg-yellow-100 rounded">
                <p className="font-bold">{event.title}</p>
                <p className="text-sm">{event.time}</p>
                <p className="text-sm">{event.description}</p>
              </div>
            ))
          }
        </div>
      )}
      {overlayVisible && (
        <div onClick={(e) => e.stopPropagation()} className="absolute top-1/4 md:top-auto md:bottom-32 left-4 h-4/5 right-4 bg-white/20 backdrop-blur-lg p-4 rounded-lg shadow-lg z-20 overflow-y-auto md:h-1/3">
          <p onClick={() => setOverlayVisible(false)} className='absolute font-semibold text-red-600 right-4 top-2 cursor-pointer'>
            <X />
          </p>

          <p className="md:text-2xl text-base font-bold">{matchingOccasion.title}</p>
          <p className="md:text-xl text-sm ">{matchingOccasion.description}</p>
          <p className="text-md text-black">{matchingOccasion.date}</p>
          <button
            onClick={() => setOverlayVisible(false)}
            className="mt-2 md:p-2 p-1 bg-red-500 text-white rounded-md"
          >
            Close
          </button>
        </div>
      )}
      {overlayContent && (
        <div
          className="absolute inset-0 flex items-center justify-center z-20"
          onClick={handleOverlayClose}
        >
          <div
            className="absolute md:top-auto md:bottom-32 left-4 right-4 bg-white/60 backdrop-blur-lg p-4 rounded-lg shadow-lg z-20 overflow-y-auto h-4/5 md:min-h-min max-h-[90vh] md:h-1/4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <p
              onClick={handleOverlayClose}
              className="absolute md:hidden top-2 right-4 text-red-500 cursor-pointer text-xl font-bold z-20"
            >
              <X />
            </p>

            {/* Conditional Content */}
            {overlayContent.type === 'info' && (
              <div className=''>
                <h2 className="text-xl font-bold">{currentContent.name}</h2>
                <p className="mt-2">{overlayContent.content}</p>
              </div>
            )}

            {overlayContent.type === 'video' && (
              <div className="w-full">
                <video controls className="w-full h-full rounded-md">
                  <source src={overlayContent.content} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            <button
              onClick={() => setOverlayContent(null)}
              className="mt-2 md:p-2 p-1 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Image Carousel */}
      <div className="relative w-full h-full overflow-hidden mt-[300px]">
        
        <div className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 w-full h-full relative">
          <Image
            key={currentImageIndex}
            src={currentImages[currentImageIndex]}
            alt="Monthly Image"
            layout="fill"
            className="transition-opacity duration-2000 ease-in-out opacity-100 object-cover"
            style={{
              animation: 'fade 2s',
            }}
          />
        </div>
      </div>

      {/* time and weather */}
      <div className='hidden md:block absolute md:top-4 md:left-4 md:right-4 md:w-auto '>      
        <TimeWeather />
      </div>


      <div className=' absolute bottom-4 px-2 left-0 right-0 flex justify-start space-x-4 z-10'>
        <Logo />
      </div>
      <div className="relative">
        {/* Main Content */}
        <div className="text-white absolute flex bottom-4 left-0 right-0 justify-end px-4 space-x-4 z-10">
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() =>
              setOverlayContent({
                type: 'info',
                content: currentContent.info,
              })
            }
          >
            <Info className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-black md:text-white md:bg-transparent bg-white/60 md:backdrop-blur-0 backdrop-blur-lg rounded-full md:rounded-none" />
            <p className='hidden lg:block'>About</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() =>
              setOverlayContent({
                type: 'video',
                content: currentContent.video,
              })
            }
          >
            <CirclePlay className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-black md:text-white md:bg-transparent bg-white/60 md:backdrop-blur-0 backdrop-blur-lg rounded-full md:rounded-none" />
            <p className='hidden lg:block'>Watch Video</p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default RightSection;
