import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import heroImg from '@/assets/bg_img.jpeg'; 

function Hero() {
  return (
    <div className="relative flex lg:h-[91vh] items-center justify-center px-6 md:px-16 lg:px-32">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full  bg-cover bg-center z-[-1]" 
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        {/* Optional overlay for darkening effect */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col my-28 lg:mx-28 2xl:my-36 items-center">
        <h1 className="font-extrabold text-center text-[32px] md:text-[44px] lg:text-[56px] text-white">
          Plan your next trip with journey, <span className="text-main">Your Personal Travel Guide</span>
        </h1>
        <p className="text-base text-center md:text-lg font-light text-gray-200">
          Whether it's a relaxing beach getaway or an adventurous mountain hike, Journey helps you create personalized travel itineraries tailored to your preferences. Discover exciting destinations, book accommodations, and explore attractions with ease.
        </p>
        <Link to={"/create-trip"}>
          <Button className="mt-12 bg-main hover:bg-secondary text-black font-bold py-2 px-6 md:py-3 md:px-8">
            Get Started for Free
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
