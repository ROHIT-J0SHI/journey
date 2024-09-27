import React from "react";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-10 bg-gray-950">
      <div className="flex flex-col md:flex-row px-8 md:px-24 lg:px-40 pb-10 pt-16 gap-8 justify-between">
        <div className="flex flex-col gap-8 md:w-[30%]">
          <Link to={"/"}>
            <div className="flex gap-2 items-center">
              <img
                src={logo}
                className="w-10 h-10 md:w-12 md:h-12"
                alt="WorldTour Logo"
              />
              <span className="text-2xl md:text-3xl text-main font-bold">
                journey
              </span>
            </div>
          </Link>

          <span className="text-gray-300 text-xs md:text-base">
            We are dedicated to helping you plan your perfect trip with
            personalized recommendations and detailed travel guides.
          </span>
        </div>

        <div>
          <h2 className="font-bold text-white text-xl md:text-2xl mb-5">
            Follow us
          </h2>
          <div className="flex flex-col gap-2 text-gray-300">
            <a
              href="https://www.facebook.com/rohit.joshi.7121614"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm hover:text-main"
            >
              Facebook
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm hover:text-main"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/rohit__j0shi/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm hover:text-main"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/rohit-j0shii/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm hover:text-main"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-white text-xl md:text-2xl mb-5 ">
            Get in Touch
          </h2>
          <p className="text-gray-300 text-xs md:text-sm">
            📩 rohitjoshii55555@gmail.com
          </p>
          <p className="text-gray-300 text-xs md:text-sm">☎️ 180-818-532</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="p-5 text-center text-xs md:text-sm text-white">
        <p>
          &copy; {new Date().getFullYear()} - journey by Rohit Joshi. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
