import React, { useEffect, useState } from 'react';
import Link from 'next/link'

export const NavbarSecondaryPages = () => {
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
          <li className='hover:bg-green-500 rounded'>
            <Link
              href="/hero"
              scroll={true}
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              DOMŮ
            </Link>
          </li>
          <li className='hover:bg-green-500 rounded'>
            <Link
              href="news"
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              NOVINKY
            </Link>
          </li>
          <li className='hover:bg-green-500 rounded'>
            <Link
              href="about"
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              O FESTIVALU
            </Link>
          </li>
          <li className='hover:bg-green-500 rounded'>
            <Link
              href="team"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              NÁŠ TÝM
            </Link>
          </li>
          <li className='hover:bg-green-500 rounded'>
            <Link
              href="events"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              PROGRAM
            </Link>
          </li>
          <li className='hover:bg-green-500 rounded'>
            <Link
              href="sponsors"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              PARTNEŘI
            </Link>
          </li>
          <li className='hover:bg-green-500 rounded'>
            <Link
              href="contact"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              KONTAKT
            </Link>
          </li>
          <li className='hover:bg-green-500 rounded'>
            <Link
              href="reservations"
              smooth={true}
              duration={500}
              offset={-headerHeight}
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              REZERVACE
            </Link>
          </li>
          <li className='hover:bg-green-500 rounded'>
            <a
              href="/media"
              className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white font-bold'}`}
            >
              MEDIA
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
