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
            <Link
              to="hero"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              DOMŮ
            </Link>
          </li>
          <li>
            <Link
              to="news"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              NOVINKY
            </Link>
          </li>
          <li>
            <Link
              to="about"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              O FESTIVALU
            </Link>
          </li>
          <li>
            <Link
              to="team"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              NÁŠ TÝM
            </Link>
          </li>
          <li>
            <Link
              to="events"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              AKCE
            </Link>
          </li>
          <li>
            <Link
              to="sponsors"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              PARTNEŘI
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              KONTAKT
            </Link>
          </li>
          <li>
            <Link
              to="reservations"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              REZERVACE
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
