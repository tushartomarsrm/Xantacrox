// import React from 'react'
import { useMediaQuery } from "react-responsive";
import ProfileSection from "./ProfileSection";
import { useState } from "react";
function Navbar() {
  const isMd = useMediaQuery({ maxWidth: 768 });
  const [show, setShow] = useState(false);
  const handleClick = () => {
    if (isMd) {
      setShow(true);
    }
  };
  return (
    <>
      <nav className="bg-gray-800 text-white  top-0 left-0 w-full z-10 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 md:py-3">
          {/* Left: App Icon and Name */}
          <div className="flex items-center">
            <div className="bg-gray-400 p-2 rounded-lg mr-4">
              {/* Replace with your app icon */}
              <img
                src="/xantacrox_icon.png"
                alt="App Icon"
                style={{mixBlendMode:"color-burn"}}
                className="w-8 h-8 md:w-9 md:h-9"
              />
            </div>
            <h1 className="text-base font-bold md:text-lg lg:text-xl">
              Xantacrox
            </h1>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-4">
            {/* Icon 1 */}
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition">
              <img
                src="/path/to/icon1.png"
                alt="Icon 1"
                className="w-5 h-5 md:w-6 md:h-6"
              />
            </div>
            {/* Icon 2 */}
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition">
              <img
                src="/path/to/icon2.png"
                alt="Icon 2"
                className="w-5 h-5 md:w-6 md:h-6"
              />
            </div>
            {/* Icon 3 */}
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-400 flex items-center justify-center hover:bg-gray-600 transition">
              <img
                src="/ProfilePic/profilepiic.jpg"
                alt="Icon 3"
                className="w-7 h-7 md:w-8 md:h-8 rounded-full hover:cursor-pointer"
                onClick={() => setShow(true)}
              />
            </div>
            {show && (
              <div className="bg-black/50 fixed inset-0 w-full h-screen flex justify-center items-center !m-0 md:hidden">
                <div className="flex flex-col w-full sm:w-2/4  h-4/5 bg-white sm:p-8 py-0 shadow-lg rounded-lg overflow-y-auto">
                  <div className="w-full p-5 text-right">
                    <button
                      onClick={() => setShow(false)}
                      className="text-xl font-bold text-pink-800"
                    >
                      X
                    </button>
                  </div>
                  <ProfileSection />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
