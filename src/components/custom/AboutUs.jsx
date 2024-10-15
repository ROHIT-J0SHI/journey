import React from 'react';
import about from '@/assets/about_img.png';

function AboutUs() {
  return (
    <section className="bg-white py-16 px-5 lg:mt-0">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          About Us
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Welcome to journey, where we aim to revolutionize the way you plan and experience travel. 
              Our platform provides personalized trip planning, allowing you to explore destinations with ease, 
              customize itineraries, and discover hidden gems. Whether you're traveling for leisure or business, 
              we're here to help you every step of the way.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              We are a bunch of college students who work tirelessly to bring you the latest tools, technology, and insights to ensure that your travels are hassle-free and memorable. With a dedicated team of travel enthusiasts and industry experts, we strive to create a community where you can share, explore, and embark on new adventures with confidence.
            </p>
          </div>

          {/* Image Section */}
          <img
            src={about}
            alt="about us image"
            className="md:w-[50vw] md:h-[60vh]"
          />
        </div>
      </div>

      
    </section>
  );
}

export default AboutUs;
