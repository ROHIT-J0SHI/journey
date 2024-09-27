import React, { useState, useEffect } from 'react';
import { fetchHotelImagesFromUnsplash } from '@/services/UnsplashApi'; // Adjust import path
import placeholder from '@/assets/placeholder.jpg';

function Hotels({ trip }) {
  const hotelData = trip?.tripInfo?.hotels;
  const [hotelImages, setHotelImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      if (hotelData) {
        const newHotelImages = {};
        for (const hotel of hotelData) {
          const query = encodeURIComponent(`${hotel?.HotelName} ${hotel["Hotel address"]}`);
          try {
            const images = await fetchHotelImagesFromUnsplash(query, 1); // Fetch 1 image per hotel
            newHotelImages[`${hotel?.HotelName}-${hotel["Hotel address"]}`] = images[0] || placeholder;
          } catch (error) {
            console.error('Error fetching image from Unsplash:', error);
            newHotelImages[`${hotel?.HotelName}-${hotel["Hotel address"]}`] = placeholder;
          }
        }
        setHotelImages(newHotelImages);
      }
    };

    fetchImages();
  }, [hotelData]);

  return (
    <div>
      <h2 className="font-bold text-[1.75rem] mt-10 mb-5">Hotel Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {hotelData?.map((hotel, index) => {
          const query = encodeURIComponent(`${hotel?.HotelName} ${hotel["Hotel address"]}`);
          return (
            <a
              key={index}
              href={`https://www.google.com/maps/search/?api=1&query=${query}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer hover:shadow-md"
            >
              <div className="overflow-hidden rounded-md">
                <img
                  src={hotelImages[`${hotel?.HotelName}-${hotel["Hotel address"]}`] || placeholder}
                  alt={hotel?.HotelName}
                  className="rounded-md max-h-32 md:max-h-40 lg:max-h-52 w-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-125"
                />
              </div>
              <div className="my-3 px-2" data-aos='fade-in' data-aos-duration='1500'>
                <h2 className="font-bold md:text-lg md:leading-normal">
                  {hotel?.HotelName}
                </h2>
                <div className="font-medium text-xs md:text-sm mt-2">
                  <p>📍 {hotel["Hotel address"]}</p>
                  <p className="text-main">💶 {hotel?.Price}</p>
                  <p className="text-yellow-400">⭐ {hotel.ratings}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
