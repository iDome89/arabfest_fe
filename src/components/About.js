import React from 'react';

export const About = () => (
  <div className="bg-white py-12 px-6">
    <div className="text-center mb-12">
      <h2 className="text-2xl font-bold text-gray-800">ABOUT THIS EVENT</h2>
      <p className="text-gray-600 mt-4">
        What you will learn and the benefits. Lorem Ipsum is simply dummy text of
        the printing and typesetting industry. Lorem Ipsum has.
      </p>
    </div>
    <div className="flex flex-wrap justify-center">
      <div className="w-full md:w-2/3 lg:w-1/2 px-4 mb-8">
        <p className="text-gray-700 mb-4">
          Join us for three days of interactive demos, announcements, and best
          practices that will keep you looking ahead.
        </p>
        <p className="text-gray-700">
          Attend sessions and interact with other designers and experts. Whether
          you're with us in NYC or tuning in from around the world, there's a
          Dione Conference and Event Template for everyone. This year's event is
          bigger than ever - with more than 20 sessions, interactive experiences
          and the opportunity to meet one-on-one with the leaders who are shaping
          the future of design.
        </p>
        <button className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded">
          CHECK SCHEDULE
        </button>
      </div>
      <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-8">
        <div className="flex items-start mb-8">
          <div className="mr-4 text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 9V7a3 3 0 00-6 0v2a3 3 0 00-6 0v2a3 3 0 006 0v-2a3 3 0 006 0v2a3 3 0 006 0v-2a3 3 0 00-6 0v2a3 3 0 006 0v2"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">LOCATION</h3>
            <p className="text-gray-600">
              New World Stages <br />
              340 W 50th St, <br />
              New York, NY 10019, USA
            </p>
          </div>
        </div>
        <div className="flex items-start mb-8">
          <div className="mr-4 text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 11h10M7 7h10m-4 8h4m-4 4h4M3 7h4m-4 8h4m-4 4h4"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">SPEAKERS</h3>
            <p className="text-gray-600">
              12 Professional Speakers: <br />
              Ridwan Kamil, Sarah Sechan, Taufik Hidayat, Chairil Tanjung.
            </p>
          </div>
        </div>
        <div className="flex items-start mb-8">
          <div className="mr-4 text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h8M8 16h8M8 20h8m-8-8h8m-8-4h8M4 8h4M4 12h4m-4 8h4"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">DATE & TIME</h3>
            <p className="text-gray-600">
              July 25th - 27th, 2017 <br />
              8:15 AM - 5:30 AM
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="mr-4 text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16h8m-8 4h8m-4-16h4m-8 8h8m-8-4h8"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">SPONSORS</h3>
            <p className="text-gray-600">
              Teh Javana, Gojek, Setipe, Blibli, Kapal Api, Indomie Soto, Energen.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;