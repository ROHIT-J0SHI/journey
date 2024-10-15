import React, { useState, useEffect } from 'react';
import { fetchImageFromPexels } from '@/services/PexelsApi';  // Adjust the import path as needed
import placeholder from '@/assets/placeholder.jpg';
import { FaShareAlt } from 'react-icons/fa'; // Importing a share icon from react-icons

function InfoSection({ trip }) {
  const location = trip?.userSelection?.location?.display_name;
  const noOfDays = trip?.userSelection?.noOfDays;
  const budget = trip?.userSelection?.budget;
  const people = trip?.userSelection?.people;

  const [imageUrls, setImageUrls] = useState([placeholder]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      if (location) {
        try {
          const image1 = await fetchImageFromPexels(location + ' aerial view');
          const image2 = await fetchImageFromPexels(location + ' landscape');
          const image3 = await fetchImageFromPexels(location + ' city view');
          setImageUrls([
            image1 ? image1.src.original : placeholder,
            image2 ? image2.src.original : placeholder,
            image3 ? image3.src.original : placeholder
          ]);
        } catch (error) {
          console.error('Error fetching images:', error);
          setImageUrls([placeholder]);
        }
      }
    };

    fetchImages();
  }, [location]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [imageUrls.length]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Travel Plan for ${location}`,
          text: `Check out this amazing travel plan for ${location}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for unsupported browsers
      alert("Sharing is not supported in your browser.");
    }
  };

  return (
    <div className="relative h-[66.67vh] w-full overflow-hidden">
      {/* Background image slider */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${imageUrls[currentIndex]})`,
          opacity: 1,
        }}
      />

      {/* Modern overlay design */}
      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black to-transparent flex justify-between items-center">
        <div className="flex flex-col text-white">
          <h1 className="text-3xl lg:text-5xl font-bold shadow-md">{location}</h1>
          <p className="mt-2 text-sm md:text-lg shadow-md">
            Trip Duration: {noOfDays || 'N/A'} days | Budget: ${budget || 'N/A'} | People: {people || 'N/A'}
          </p>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="bg-white p-2 rounded-full hover:shadow-lg transition-all duration-300"
          aria-label="Share"
        >
          <FaShareAlt className="text-black text-xl md:text-4xl" />
        </button>
      </div>
    </div>
  );
}

export default InfoSection;
