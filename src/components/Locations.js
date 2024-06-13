import React, { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import { HiMapPin } from "react-icons/hi2";

export const Locations = () => {
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await apiRequest.get("/locations?sort=id&populate=*", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API}`,
          },
        });

        setLocations(response.data.data);
      } catch (error) {
        console.error("Error fetching Locations:", error);
      }
    };
    fetchLocations();
  }, []);

  if (!locations) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">
        Místa konání
      </h2>
      <div className="container mx-auto flex flex-wrap justify-center gap-6">
        <div className="flex flex-wrap justify-center gap-6">
          {locations.map((venue, index) => (
            <div
              key={index}
              className="w-full min-w-[320px] sm:w-[320px] bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative flex flex-col"
            >
              <a
                href={`${venue.attributes.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block flex-shrink-0"
              >
                <div className="h-40 flex items-center justify-center">
                  <img
                    src={venue.attributes.picture.data.attributes.url}
                    alt={venue.attributes.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </a>
              <div className="grid h-full items-start grid-cols-4 bg-gray-100 p-4">
                <a
                  href={venue.attributes.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 font-semibold col-span-3"
                >
                  {venue.attributes.name}
                </a>
                <a
                  href={venue.attributes.map_link}
                  className="flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>Mapa:</p>
                  <HiMapPin className="text-gray-500 ml-2 cursor-pointer" />
                </a>
                <div className="flex items-center col-span-4 mt-2 gap-[5px]">
                  <p className="text-xs text-gray-700 font-semibold">Adresa:</p>
                  <a
                    href={venue.attributes.map_link}
                    className="text-xs text-gray-700 hover:text-black"
                  >
                    {venue.attributes.address}
                  </a>
                </div>
                <div className="flex items-center col-span-4 mt-2 gap-[5px]">
                  <p className="text-xs text-gray-700 font-semibold">Web:</p>
                  <a
                    href={venue.attributes.website}
                    className="text-xs text-gray-700 hover:text-black"
                  >
                    {venue.attributes.name}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Locations;
