// components/TravelTips.js
import React from 'react';

const travelTips = [
  { tip: "Always carry a power bank for your devices.", icon: "🔋" },
  { tip: "Learn a few phrases in the local language.", icon: "🗣️" },
  { tip: "Try local food to get the true flavor of the place.", icon: "🍽️" },
  { tip: "Pack light and leave room for souvenirs.", icon: "🧳" },
  { tip: "Stay hydrated and take breaks during your adventures.", icon: "💧" },
  { tip: "Keep a copy of important documents in case of loss.", icon: "🗂️" },
];

const TravelTips = () => {
  return (
    <div className="bg-gray-100 p-8 rounded-lg mt-16">
      <h2 className="font-bold text-3xl text-gray-900 mb-6">Travel Tips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {travelTips.map((tip, index) => (
          <div
            key={index}
            className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay={index * 100} // Adding a delay for staggered effect
          >
            <div className="text-3xl mr-4">{tip.icon}</div>
            <p className="text-gray-700">{tip.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelTips;
