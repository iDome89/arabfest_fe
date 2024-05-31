import React from "react";

export const Sponsors = () => {
  const sponsors = [
    { name: '', logo: ''},
  ]

  return (
    <div className="bg-white py-12 px-6">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-800">Partneři</h2>
        <p className="text-gray-600 mt-4">Toto jsou naši úžasní sponzoři a partneři, kterým moc děkujeme za spolupráci.</p>
      </div>
      <div className="flex flex-wrap justify-center item-center space-x-8 space-y-4">
        {sponsors.map((sponsor, index) => (
            <div key={index} className="w-1/3 md:w-1/6 px-4 mb-8">
              <img src={sponsor.logo} alt={sponsor.name} className="mx-auto h-16" />
              <p className="text-center text-gray-700 mt-4">{sponsor.name}</p>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Sponsors;
