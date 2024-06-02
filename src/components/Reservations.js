import React from 'react';

export const Reservations = () => {
  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Rezervace</h1>
        <p className="text-lg text-gray-700">Zarezervujte si svoje místo už teď!</p>
      </div>
      <div className="max-w-4xl mx-auto">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <div className='w-[300px]'>
                <select className='w-full border border-gray-300 p-3 rounded-md bg-gray-100'>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
            </div>
          </div>
          <div className="col-span-1"> 
            <input
              type="text"
              placeholder="Jméno"
              className="w-full border border-gray-300 p-3 rounded-md bg-gray-100"
              required
            />
          </div>
          <div className="col-span-1">
            <input
              type="email"
              placeholder="email@mail.com"
              className="w-full border border-gray-300 p-3 rounded-md bg-gray-100"
              required
            />
          </div>
          <div className="col-span-2">
            <textarea
              placeholder="Zpráva"
              className="w-full border border-gray-300 p-3 rounded-md bg-gray-100"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="col-span-2 text-right">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-colors duration-300"
            >
              POSLAT ZPRÁVU
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reservations;
