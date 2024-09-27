import React from 'react';
import { FaAtom, FaEdit, FaShareAlt } from 'react-icons/fa'; // Import the correct icons from Font Awesome

const HowItWorks = () => {
  return (
    <div className='mt-10 lg:mt-0'>
      <section className="py-8 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h2 className="font-bold text-3xl">How it Works?</h2>
        <h2 className="text-md text-gray-500">Plan your trip in just 3 simple steps</h2>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <a
            className="block rounded-xl border bg-white
              border-gray-200 p-8 shadow-xl"
            href="#"
          >
            <FaAtom className="h-8 w-8" /> {/* Corrected Icon */}

            <h2 className="mt-4 text-xl font-bold text-black">Login with Google</h2>

            <p className="mt-1 text-sm text-gray-600">
              Easily sign in using your Google account to access personalized travel recommendations and manage your trips effortlessly.
            </p>
          </a>

          <a
            className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl"
            href="#"
          >
            <FaEdit className="h-8 w-8" /> {/* Corrected Icon */}

            <h2 className="mt-4 text-xl font-bold text-black">Customize Your Itinerary</h2>

            <p className="mt-1 text-sm text-gray-600">
              Edit and personalize your travel plans by adding destinations, activities, and accommodations that suit your preferences.
            </p>
          </a>

          <a
            className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition"
            href="#"
          >
            <FaShareAlt className="h-8 w-8" /> {/* Corrected Icon */}

            <h2 className="mt-4 text-xl font-bold text-black">Share and Explore</h2>

            <p className="mt-1 text-sm text-gray-600">
              Review the details of your trip and share it with friends and family. Get directions, tips, and recommendations for a seamless travel experience.
            </p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
