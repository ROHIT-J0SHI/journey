import React from 'react';

function Hotels({ trip }) {
  const hotelData = trip?.tripInfo?.hotels;

  // Static image URLs
  const staticHotelImages = [
    'https://www.altdesignconstruction.com/storage/app/media/ZEKKEI_intuition_niseko_210118_20_033.jpg',
    'https://www.rwsentosa.com/-/jssmedia/project/non-gaming/rwsentosa/hotels/hotel-ora/hotel-ora-images/jpeg/hotelora_deluxepoolview_750x422_1.jpg?h=633&iar=0&w=1125&rev=08236011a73b46c6834d5e8f3bbe98b8&sc_lang=en&hash=08CD206F43023937D6B51E51AFE6BCAA',
    'https://www.bhg.com/thmb/G-kqlGIybOCaruEpQYXaZR5z90Y=/6293x0/filters:no_upscale():strip_icc()/102986729_preview-51bb27fb39324fa299653aceb7a053d7.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnoT2Tq8Ouzh7kf2_bX09PtIcjdMs-FnXv0g&s'
  ];

  return (
    <div>
      <h2 className="font-bold text-[1.75rem] mt-10">Hotel Recommendations</h2>
      <p className='mb-5 lg:mb-10'>We've handpicked the best hotels tailored to your budget, ensuring the perfect stay for you.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {hotelData?.map((hotel, index) => {
          const query = encodeURIComponent(`${hotel?.HotelName} ${hotel["Hotel address"]}`);
          const hotelImage = staticHotelImages[index]; // Assign the image based on index

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
                  src={hotelImage} // Use the static image based on index
                  alt={hotel?.HotelName}
                  className="rounded-md h-36 md:h-40 lg:h-48 w-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-125"
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
