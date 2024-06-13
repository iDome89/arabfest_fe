import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`navbar p-4 sm:p-6 fixed z-10 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent header-shadow'
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between w-full z-50">
          <a className={`ml-3 text-2xl sm:text-3xl font-bold transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}>
            ARABFEST
          </a>
          <div className="md:hidden">
            <button onClick={toggleMenu} className={`focus:outline-none transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}>
              {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </button>
          </div>
        </div>
        <div className="hidden md:flex space-x-4 sm:space-x-6">
          {['aktuality', 'festival', 'tým', 'program', 'partneři', 'kontakt', 'rezervace'].map((section, index) => (
            <Link
              key={index}
              to={section}
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              {section.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-20">
          <div className="flex flex-col w-full items-center justify-center h-full">
            {['aktuality', 'festival', 'tým', 'program', 'partneři', 'kontakt', 'rezervace'].map((section, index) => (
              <Link
                key={index}
                to={section}
                smooth={true}
                duration={500}
                offset={-headerHeight}
                className="text-white text-xl font-bold mb-6"
                onClick={toggleMenu}
              >
                {section.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
