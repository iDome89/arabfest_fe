export const Reservations = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Kontaktní formulář</h1>
      </div>
      <div className="max-w-4xl mx-auto">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="col-span-1 md:col-span-2">
            <textarea
              placeholder="Zpráva"
              className="w-full border border-gray-300 p-3 rounded-md bg-gray-100"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="col-span-1 md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-colors duration-300"
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
