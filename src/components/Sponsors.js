import { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";

export const Sponsors = () => {
  const [sponsors, setSponsors] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentSponsor, setCurrentSponsor] = useState(null);

  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        const response = await apiRequest.get("/partners?populate=*&pagination[pageSize]=30&sort=id:asc", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API}`,
          },
        });
        setSponsors(response.data.data);
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      }
    };
    fetchSponsor();
  }, []);

  const handleInfoClick = (sponsor) => {
    setCurrentSponsor(sponsor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentSponsor(null);
  };

  if (!sponsors) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Partneři</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="w-full sm:w-[300px] bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative flex flex-col"
          >
            <a href={sponsor.attributes.url} target="_blank" rel="noopener noreferrer" className="block flex-shrink-0">
              <div className="h-40 flex items-center justify-center">
                <img
                  src={sponsor.attributes.picture.data.attributes.url}
                  alt={sponsor.attributes.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
