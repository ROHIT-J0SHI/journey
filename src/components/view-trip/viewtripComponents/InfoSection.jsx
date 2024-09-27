import React, { useState, useEffect } from 'react';
import { fetchImageFromPexels } from '@/services/PexelsApi';  // Adjust the import path as needed
import placeholder from '@/assets/placeholder.jpg';

function InfoSection({ trip }) {
  // Safely access nested properties using optional chaining
  const location = trip?.userSelection?.location?.display_name;
  const noOfDays = trip?.userSelection?.noOfDays;
  const budget = trip?.userSelection?.budget;
  const people = trip?.userSelection?.people;

  // State to store image URL
  const [imageUrl, setImageUrl] = useState(placeholder);

  // Fetch image from Pexels API
  useEffect(() => {
    const fetchImage = async () => {
      if (location) {
        try {
          const image = await fetchImageFromPexels(location + ' aerial view');
          setImageUrl(image ? image.src.original : placeholder);
        } catch (error) {
          console.error('Error fetching image:', error);
          setImageUrl(placeholder);
        }
      }
    };

    fetchImage();
  }, [location]);  // Fetch image whenever location changes

  return (
    <div>
      <img 
        src={imageUrl}  // Use dynamic image URL
        className='h-[50vh] md:h-[60vh] w-full rounded-md object-cover' 
        alt={location || 'Trip Image'} 
      />

      <div className='my-5 flex flex-col gap-4'>
        <h2 className='font-bold text-2xl md:text-4xl'>
          {location}
        </h2>

        <div className='flex gap-5'>
          <h2 className='p-1 px-5 bg-gray-300 text-xs md:text-[15px] rounded-full'>
            {noOfDays} Days
          </h2>
          <h2 className='p-1 px-5 bg-gray-300 text-xs md:text-[15px] rounded-full'>
            {budget}
          </h2>
          <h2 className='p-1 px-5 bg-gray-300 text-xs md:text-[15px] rounded-full'>
            {people}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
