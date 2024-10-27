import React from 'react';
import { FaAtom, FaEdit, FaShareAlt, FaInfoCircle } from 'react-icons/fa';

const HowItWorks = () => {
  const places = [
    {
      src: 'https://www.usnews.com/dims4/USNEWS/d1a7c9d/2147483647/resize/1200x%3E/quality/85/?url=http:%2F%2Fmedia.beam.usnews.com%2F8b%2Ffa%2Fa12c04ec44acb430cae873bc3752%2F20-santorini-getty.jpg',
      title: 'Santorini, Greece',
      description: 'White-washed buildings and crystal blue waters.',
      wikipedia: 'https://en.wikipedia.org/wiki/Santorini',
    },
    {
      src: 'https://th.bing.com/th/id/OIP.1oG7vYjhZD0w6AU3sd_euwHaJO?w=1080&h=1345&rs=1&pid=ImgDetMain ',
      title: 'Sagrada Familia',
      description: "Gaudí's masterpiece in Barcelona.",
      wikipedia: 'https://en.wikipedia.org/wiki/Sagrada_Fam%C3%ADlia',
    },
    {
      src: 'https://traveltomorrow.com/wp-content/uploads/2021/02/123780913_2623937247916959_5865294348514102412_n.jpg',
      title: 'Sydney Opera House',
      description: 'An iconic architectural symbol of Australia.',
      wikipedia: 'https://en.wikipedia.org/wiki/Sydney_Opera_House',
    },
    {
      src: 'https://th.bing.com/th/id/OIP.7Sl7uVy7mRMac4VQfwq2BQHaE8?rs=1&pid=ImgDetMain',
      title: 'Munnar',
      description: 'Lush greenery in Kerala, India.',
      wikipedia: 'https://en.wikipedia.org/wiki/Munnar',
    },
    {
      src: 'https://th.bing.com/th/id/OIP.Qah_o4mHhMM6nKWYoF4ROgAAAA?rs=1&pid=ImgDetMain',
      title: 'Amalfi Coast',
      description: 'Stunning cliffs and vibrant villages in Italy.',
      wikipedia: 'https://en.wikipedia.org/wiki/Amalfi_Coast',
    },
    {
      src: 'https://www.stlucia.org/wp-content/uploads/2019/04/sms-preview.jpg',
      title: 'Saint Lucia',
      description: 'Caribbean paradise with volcanic mountains.',
      wikipedia: 'https://en.wikipedia.org/wiki/Saint_Lucia',
    },
    {
      src: 'https://travelwarm.com/wp-content/uploads/2020/09/Zurich-Switzerland.jpg',
      title: 'Zurich',
      description: 'Stunning lakes and a financial hub of Switzerland.',
      wikipedia: 'https://en.wikipedia.org/wiki/Z%C3%BCrich',
    },
    {
      src: 'https://static.toiimg.com/photo/msid-93903117,width-96,height-65.cms',
      title: 'Munsiyari',
      description: 'Himalayan hill station in Uttarakhand, India.',
      wikipedia: 'https://en.wikipedia.org/wiki/Munsiyari',
    },
  ];

  return (
    <div className="mt-10 lg:mt-0">
      {/* How It Works Section */}
      <section className="py-8 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h2 className="font-bold text-4xl text-gray-900">How it Works?</h2>
        <p className="text-md text-gray-600 mt-2">Plan your trip in 3 simple steps</p>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <a
            className="block rounded-xl border bg-white border-gray-100 p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            href="#"
          >
            <FaAtom className="h-10 w-10 text-blue-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Login with Google</h2>
            <p className="mt-2 text-gray-500">
              Easily sign in with your Google account to get personalized travel recommendations.
            </p>
          </a>

          <a
            className="block rounded-xl border bg-white border-gray-100 p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            href="#"
          >
            <FaEdit className="h-10 w-10 text-green-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Customize Your Itinerary</h2>
            <p className="mt-2 text-gray-500">
              Personalize your travel plans by adding destinations, activities, and accommodations.
            </p>
          </a>

          <a
            className="block rounded-xl border bg-white border-gray-100 p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            href="#"
          >
            <FaShareAlt className="h-10 w-10 text-purple-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Share and Explore</h2>
            <p className="mt-2 text-gray-500">
              Share your trip with friends and get tips for a seamless experience.
            </p>
          </a>
        </div>
      </section>

      {/* Destinations Section */}
      <section className='bg-gray-100 py-10 md:p-10'>
      <h1 className="text-3xl text-center font-bold text-gray-900">Explore Stunning Destinations</h1>
      <p className="text-md text-gray-600 text-center mt-2">Discover some of the world's most beautiful places</p>
      <p className='text-md text-gray-600 text-center mt-2'>(scroll right)</p>

      <div className="mt-10 overflow-x-auto whitespace-nowrap scrollbar-hide ">
        {places.map((place, index) => (
          <div
            key={index}
            className="relative inline-block border border-gray-300 rounded-lg shadow-md max-w-[350px] m-3 transition-transform duration-300 hover:scale-105 bg-white"
            style={{ minWidth: '350px' }}
          >
            <div className="relative w-full h-[250px] overflow-hidden rounded-lg">
              <img
                src={place.src}
                alt={place.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 rounded-lg"
              />
              {/* Overlay with title and description on hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 p-4 rounded-lg">
                <a href={place.wikipedia} target="_blank" rel="noopener noreferrer">
                  <FaInfoCircle className="absolute top-2 right-2 text-white text-2xl opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </a>
                <div className="text-center">
                  <h2 className="font-bold text-2xl text-white">{place.title}</h2>
                  <p className="mt-2 text-sm text-gray-200">{place.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </section>
    </div>
  );
};

export default HowItWorks;
