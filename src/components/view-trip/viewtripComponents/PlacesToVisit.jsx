import React, { useState, useEffect } from "react";
import { fetchImageFromPexels } from '@/services/PexelsApi'; // Adjust the import path as needed
import placeholder from "@/assets/placeholder.jpg";

// Helper function to truncate text to the first 20 words
const truncateDescription = (description, wordLimit = 16) => {
  if (!description) return "";
  const words = description.split(" ");
  if (words.length <= wordLimit) return description;
  return words.slice(0, wordLimit).join(" ") + "...";
};

function PlacesToVisit({ trip }) {
  const [placeImages, setPlaceImages] = useState({});
  const itinerary = trip?.tripInfo?.itinerary;

  // Fetch images for each place
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

  // Convert itinerary object to an array of [day, places] pairs and sort by day number
  const placeData = itinerary
    ? Object.entries(itinerary).sort(([dayA], [dayB]) => {
        // Extract the numeric part of the day (e.g., "Day 1" -> 1, "Day 2" -> 2)
        const dayNumA = parseInt(dayA.replace("Day ", ""));
        const dayNumB = parseInt(dayB.replace("Day ", ""));
        return dayNumA - dayNumB;
      })
    : [];

  return (
    <div>
      <h2 className="font-bold text-[1.75rem] mt-10 mb-5">Places to Visit</h2>
      <p className="text-gray-600 text-base md:text-lg mb-8">
        Discover the best spots and hidden gems in your travel to{" "}
        <span className="font-bold text-main">{trip?.userSelection?.location?.display_name}</span>. Each location is curated to make your journey memorable.
      </p>

      <div>
        {placeData.length > 0 ? (
          placeData.map(([day, places], index) => (
            <div key={index} className="mb-10">
              <h2 className="font-bold text-[1.5rem] mb-5">{day}</h2>

              {/* Grid for places */}
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
                {places.map((place, placeIndex) => {
                  const query = encodeURIComponent(`${place?.placeName}`);
                  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

                  // Determine the animation class based on the index
                  const animationClass = placeIndex % 2 === 0 ? "fade-up-right" : "fade-up-left";

                  return (
                    <div
                      key={placeIndex}
                      className="border-none shadow-lg p-4 rounded-lg flex flex-col md:flex-row gap-2 md:gap-8"
                      data-aos={animationClass} data-aos-duration="1300"
                    >
                      <img
                        src={placeImages[place.placeName] || placeholder}
                        alt={place.placeName}
                        className="w-full md:max-w-[40%] h-48  md:max-h-60 object-cover rounded-md"
                      />
                      <div className="flex flex-col w-full md:w-2/3">
                        <h3 className="font-semibold text-[1.1rem] mb-2">{place.placeName}</h3>
                        <p className="text-[13px] text-gray-700 mb-1">{truncateDescription(place["Place details"])}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-4 mt-2">
                          <p className="text-sm">⭐ {place.Rating}</p>
                          <p className="text-sm">💵 {place["Ticket pricing"]}</p>
                          <p className="text-sm">🕒 {place["Time to travel"]}</p>
                          
                          <span 
                            onClick={() => window.open(directionsUrl, "_blank", "noopener,noreferrer")}
                            className="text-main inline font-semibold hover:text-secondary cursor-pointer"
                          >
                            Show Directions
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <p className="mt-20 text-2xl">Oops! No places found to visit. Please try again later.</p>
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
