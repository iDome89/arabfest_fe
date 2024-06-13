import React, { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import { FaInfoCircle } from "react-icons/fa";
import SpeakerInfoModal from "./SpeakerInfoModal";

export const Speakers = () => {
  const [speakers, setSpeakers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState(null);

  const handleInfoClick = (speaker) => {
    setCurrentSpeaker(speaker);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentSpeaker(null);
  };

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await apiRequest.get(
          "/speakers?sort=id&populate=speaker.picture",
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API}`,
            },
          }
        );
        setSpeakers(response.data.data);
      } catch (error) {
        console.error("Error fetching Speakers:", error);
      }
    };
    fetchSpeakers();
  }, []);

  if (!speakers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">
        Přednášející a ůčinckující
      </h2>
      <div className="container mx-auto flex flex-wrap justify-center gap-6">
        {speakers.length > 0 &&
          speakers.map((member, index) => (
            <div key={index} className="w-[220px] h-[260px] px-2 mb-8">
              <div className="overflow-hidden h-full bg-gray-200 rounded-lg shadow-lg">
                <img
                  src={member.attributes.speaker.picture.data[0].attributes.url}
                  alt={`${member.attributes.speaker.first_name} ${member.attributes.speaker.last_name}`}
                  className="w-[220px] h-[200px] object-cover"
                />
                <div className="bg-gray-200 text-center py-2 flex flex-col items-center">
                  <p className="text-lg flex items-center font-semibold text-black">
                    {`${member.attributes.speaker.first_name} ${member.attributes.speaker.last_name}`}
                    <FaInfoCircle
                      className="text-gray-500 ml-2 cursor-pointer"
                      onClick={() => handleInfoClick(member.attributes.speaker)}
                    />
                  </p>
                  {member.attributes.speaker.website && (
                    <a
                      className="flex justify-center items-center gap-1 text-gray-700 hover:text-black mt-1"
                      href={`${member.attributes.speaker.website}`}
                    >
                      {member.attributes.speaker.website}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {currentSpeaker && <SpeakerInfoModal showModal={showModal} onClose={handleCloseModal} speaker={currentSpeaker}/>}
    </div>
  );
};

export default Speakers;
