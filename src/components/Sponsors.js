import React from "react";
import { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import { FaInfoCircle } from "react-icons/fa";

export const Sponsors = () => {
  const [sponsors, setSponsors] = useState(null);

  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        const response = await apiRequest.get("/partners?populate=*", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API}`,
          },
        });
        setSponsors(response.data.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchSponsor();
  }, []);
  console.log(sponsors);
  if (!sponsors) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white py-12 px-6">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-800">Partneři</h2>
        <p className="text-gray-600 mt-4">
          Toto jsou naši úžasní sponzoři a partneři, kterým moc děkujeme za
          spolupráci.
        </p>
      </div>
      <div className="flex flex-wrap justify-center item-center space-x-8 space-y-4">
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="w-[300px] h-[200px] flex flex-col align-start mb-8 relative"
          >
            <a href={sponsor.attributes.url} target="_blank">
              <img
                src={sponsor.attributes.picture.data.attributes.url}
                alt={sponsor.name}
                className="w-full"
              />
            </a>
            <div className="flex items-end justify-between">
              <a href={sponsor.attributes.url} target="_blank">
                <p className="text-gray-700 mt-4">{sponsor.attributes.name}</p>
              </a>
              <FaInfoCircle className="text-gray-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
