import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    const headerElement = document.querySelector('.navbar');
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`navbar p-4 sm:p-6 fixed z-10 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent header-shadow'
      }`}
    >
      <div className="flex-1">
        <a className={`text-2xl sm:text-3xl font-bold transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}>
          ARABFEST
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-4 sm:space-x-6">
          {['hero', 'news', 'about', 'team', 'events', 'sponsors', 'contact', 'reservations'].map((section, index) => (
            <li key={index}>
              <Link
                to={section}
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
              >
                {section.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
