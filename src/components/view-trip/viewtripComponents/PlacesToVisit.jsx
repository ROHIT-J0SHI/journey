import React, { useState, useEffect } from "react";
import { fetchImageFromPexels } from '@/services/PexelsApi'; // Adjust the import path as needed
import placeholder from "@/assets/placeholder.jpg";


// Example day descriptions
const dayDescriptions = {
  "Day 1": "Start your trip with beautiful landscapes and iconic places.",
  "Day 2": "Explore hidden gems and enjoy local delicacies.",
  "Day 3": "Immerse yourself in vibrant culture and rich history.",
  "Day 4": "Take a deep dive into nature’s wonders and city escapes.",
  "Day 5": "Discover artistic spots and breathtaking views.",
  "Day 6": "Indulge in culinary experiences and shopping sprees.",
  "Day 7": "End your journey with a visit to famous landmarks."
};

function PlacesToVisit({ trip }) {
  const [placeImages, setPlaceImages] = useState({});
  const [showLocalEvents, setShowLocalEvents] = useState(false); // State for local events
  const itinerary = trip?.tripInfo?.itinerary;

  useEffect(() => {
    const fetchImages = async () => {
      if (!itinerary) return;

      const places = Object.values(itinerary).flat();
      const uniquePlaces = Array.from(new Set(places.map(place => place.placeName)));

      try {
        const fetchImagePromises = uniquePlaces.map(placeName =>
          fetchImageFromPexels(placeName).then(image => {
            return {
              placeName,
              imageUrl: image ? image.src.original : placeholder,
            };
          })
        );

        const imageResults = await Promise.all(fetchImagePromises);
        const imageMap = imageResults.reduce((acc, { placeName, imageUrl }) => {
          acc[placeName] = imageUrl;
          return acc;
        }, {});

        setPlaceImages(imageMap);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [itinerary]);

  const placeData = itinerary
    ? Object.entries(itinerary).sort(([dayA], [dayB]) => {
        const dayNumA = parseInt(dayA.replace("Day ", ""));
        const dayNumB = parseInt(dayB.replace("Day ", ""));
        return dayNumA - dayNumB;
      })
    : [];

  const generateWikipediaLink = (placeName) => {
    const query = encodeURIComponent(placeName);
    return `https://en.wikipedia.org/wiki/${query}`;
  };

  const handleLocalEventsClick = () => {
    setShowLocalEvents(true); // Show the LocalEvent component when clicked
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="font-bold text-4xl mb-5 text-gray-900">Places to Visit</h2>
      <p className="text-gray-700 text-base md:text-lg mb-8">
        <span className="block md:hidden">
          Embark on an unforgettable adventure as you discover the best spots and hidden gems in your travel to{" "}
          <span className="font-bold text-main">{trip?.userSelection?.location?.display_name}</span>.
        </span>
        
        <span className="hidden md:block">
          Embark on an unforgettable adventure as you discover the best spots and hidden gems in your travel to{" "}
          <span className="font-bold text-main">{trip?.userSelection?.location?.display_name}</span>. 
          From breathtaking landscapes to vibrant local cultures, each destination is carefully curated to ensure your journey is both enriching and memorable.
        </span>
      </p>

      <div>
        {placeData.length > 0 ? (
          placeData.map(([day, places], index) => (
            <div key={index} className="mb-12">
              <h2 className="font-bold text-2xl mb-5">
                <span className="block md:hidden">{day}</span>
                <span className="hidden md:block">{day} - {dayDescriptions[day] || "Enjoy your day exploring!"}</span>
              </h2>

              <div className={`grid ${places.length <= 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
                {places.map((place, placeIndex) => {
                  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`;

                  return (
                    <div
                      key={placeIndex}
                      className="group relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                      data-aos="zoom-in" data-aos-duration="1200"
                    >
                      <div className="relative h-48 md:h-60 w-full">
                        <img
                          src={placeImages[place.placeName] || placeholder}
                          alt={place.placeName}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                        <div className="absolute bottom-0 p-4">
                          <h3 className="text-lg font-semibold text-white">{place.placeName}</h3>
                        </div>
                      </div>

                      <div className="p-4 bg-white flex justify-between text-gray-700 text-sm">
                        <div className="flex items-center space-x-2">
                          <span>⭐ {place.Rating}</span>
                          <span>💵 {place["Ticket pricing"]}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>🕒 {place["Time to travel"]}</span>
                        </div>
                      </div>

                      <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-transparent to-black">
                        <p className="text-white mb-4">{place["Place details"]}</p>
                        <div className="flex justify-between">
                          <a
                            href={generateWikipediaLink(place.placeName)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-main text-xs md:text-base font-semibold hover:text-secondary"
                          >
                            Read More
                          </a>
                          <button
                            onClick={() => window.open(directionsUrl, "_blank", "noopener,noreferrer")}
                            className="text-main text-xs md:text-base font-semibold hover:text-secondary"
                          >
                            Show Directions
                          </button>
                          <button
                            onClick={() => handleShare(place.placeName, directionsUrl)}
                            className="text-main text-xs md:text-base font-semibold hover:text-secondary"
                          >
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <p className="mt-20 text-2xl text-center text-gray-700">Oops! No places found to visit. Please try again later.</p>
        )}
      </div>

      {/* Local Events Button */}
      <button
  onClick={handleLocalEventsClick}
  className="fixed bottom-9 right-9 text-main rounded-full text-xs md:text-base h-14 w-14 md:h-16 md:w-16 flex items-center justify-center shadow-2xl bg-main hover:bg-secondary text-white transition-all duration-300 animate-bounce p-5 md:p-10"
  style={{ zIndex: 1000, boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)' }}
>
  Local Events
</button>

      {/* Render LocalEvent component conditionally */}
      {showLocalEvents && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl relative max-w-screen-md w-full h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowLocalEvents(false)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full h-10 w-10 flex items-center justify-center transition-transform transform hover:scale-110"
            >
              &#x2715;
            </button>
            <img 
            src="https://www.shutterstock.com/image-photo/coming-soon-wording-on-white-600nw-1352173331.jpg" 
            alt="Coming Soon image"
            className="h-[100%] w-[100%]" />
          </div>
        </div>
      )}
    



      {/* Continuous bounce animation */}
      <style jsx>{`
        @keyframes bounce-up {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce-up 0.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default PlacesToVisit;
