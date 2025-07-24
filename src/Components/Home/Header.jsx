import React from "react";
import headerImg from "../../assets/Images/header.jpg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="container relative px-4 py-6 mx-auto">
      <img
        src={headerImg}
        alt="headImg"
        className="w-full h-full max-h-[600px] object-cover rounded-2xl"
      />

      {/* Content Over Image */}
      <div className="absolute w-full px-4 -translate-y-1/2 top-1/2 right-4 sm:right-10 sm:px-10 text-end sm:w-auto">
        <h2 className="text-3xl font-bold text-gray-500 sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome at
          <span className="block text-4xl text-yellow-600 sm:text-6xl md:text-7xl lg:text-8xl">
            Pizza House
          </span>
        </h2>

        <h1 className="pt-4 mb-4 text-xl font-bold text-gray-500 sm:text-2xl md:text-3xl lg:text-4xl">
          Best Pizza in Town 🍕
        </h1>

        <div className="flex justify-end">
          <Link to="/menue">
            <button className="px-5 py-2 text-sm font-bold text-gray-600 transition bg-yellow-600 rounded-full sm:px-6 sm:py-3 sm:text-lg hover:bg-orange-500">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
