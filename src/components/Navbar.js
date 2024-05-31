import React from 'react';

export const Navbar = () => (
  <div className="navbar p-6 bg-white fixed z-10 w-full shadow-md">
    <div className="flex-1">
      <a className="text-black text-3xl font-bold">ARABFEST</a>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li>
          <a className="text-black">HOME</a>
        </li>
        <li>
          <a className="text-black">ABOUT</a>
        </li>
        <li>
          <a className="text-black">VENUE</a>
        </li>
        <li>
          <a className="text-black">SPEAKERS</a>
        </li>
        <li>
          <a className="text-black">SCHEDULE</a>
        </li>
        <li>
          <a className="text-black">HOTELS</a>
        </li>
        <li>
          <a className="text-black">TICKET</a>
        </li>
        <li>
          <a className="text-black">PAGES</a>
        </li>
      </ul>
    </div>
  </div>
);
