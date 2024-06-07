import React from 'react';
import { FaEnvelope, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-white py-12 px-6 text-center">
      <div className="flex justify-center items-center space-x-12 mb-8">
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-green-600" size={40} />
          <span className="text-gray-700 text-xl font-semibold">kontakt@arabfest.cz</span>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4 sm:space-x-6">
        <a href="https://www.facebook.com/arabfestCZ" target="_blank" rel="noopener noreferrer" className="text-green-500">
          <FaFacebook className="w-10 h-10 sm:w-12 sm:h-12" />
        </a>
        <a href="https://www.instagram.com/arabfestcz/" target="_blank" rel="noopener noreferrer" className="text-green-500">
          <FaInstagram className="w-10 h-10 sm:w-12 sm:h-12" />
        </a>
        <a href="https://www.youtube.com/channel/UCrE3Sm94-YsHp74rh_JJxRA" target="_blank" rel="noopener noreferrer" className="text-green-500">
          <FaYoutube className="w-10 h-10 sm:w-12 sm:h-12" />
        </a>
      </div>
    </div>
  );
};

export default Contact;
