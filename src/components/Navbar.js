import React, { useEffect, useState } from 'react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`navbar p-6 fixed z-10 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-none' : 'bg-transparent header-shadow'
      }`}
    >
      <div className="flex-1">
        <a className={`text-3xl font-bold transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}>
          ARABFEST
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}>HOME</a>
          </li>
          <li>
            <a className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}>ABOUT</a>
          </li>
          <li>
            <a className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}>VENUE</a>
          </li>
          <li>
            <a className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}>SPEAKERS</a>
          </li>
          <li>
            <a className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}>SCHEDULE</a>
          </li>
          <li>
            <a className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}>HOTELS</a>
          </li>
          <li>
            <a className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}>TICKET</a>
          </li>
          <li>
            <a className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}>PAGES</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
