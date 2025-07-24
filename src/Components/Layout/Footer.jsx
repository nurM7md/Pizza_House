import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="flex flex-col justify-between gap-6 px-4 py-6 bg-yellow-600 shadow md:flex-row">
      {/* Pages */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-center text-yellow-950">Pages</h2>
        <div className="py-2 text-center">
          <p className="text-lg font-semibold text-gray-700"><Link to="/">Home</Link></p>
          <p className="text-lg font-semibold text-gray-700"><Link to="/menue">Menue</Link></p>
          <p className="text-lg font-semibold text-gray-700"><Link to="/about">About</Link></p>
          <p className="text-lg font-semibold text-gray-700"><Link to="/contactus">Contact Us</Link></p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-center text-yellow-950">Contact Info</h2>
        <div className="py-2 text-center">
          <p className="text-lg font-semibold text-gray-700">Tele: <span>0402547865</span></p>
          <p className="text-lg font-semibold text-gray-700">Mail: <span>Nurmohammed931110@gmail.com</span></p>
          <p className="text-lg font-semibold text-gray-700">Address: Saied Street</p>
        </div>
      </div>

      {/* Opening Hours */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-center text-yellow-950">Opening Hours</h1>
        <div className="py-2 text-center">
          <p className="text-lg font-semibold text-gray-700">Mon – Fri: 10:00 – 23:00</p>
          <p className="text-lg font-semibold text-gray-700">Sat – Sun: 12:00 – 00:00</p>
        </div>
      </div>

      {/* Feedback */}
      <div className="flex flex-col items-center flex-1">
        <textarea
          placeholder="Send us your feedback"
          className="w-full max-w-xs px-3 py-2 mb-2 text-white bg-yellow-950 rounded-xl"
          rows={5}
        />
        <button className="px-4 py-2 font-bold text-gray-300 transition rounded-full bg-yellow-950 hover:bg-yellow-800">
          Send
        </button>
      </div>
    </div>
  );
};

export default Footer;
