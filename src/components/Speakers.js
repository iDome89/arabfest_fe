import { useState } from "react";
import SpeakerInfoModal from "./SpeakerInfoModal";
import { useGetAll } from "@/features/useGetAll";

export const Speakers = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState(null);
  const { speakers } = useGetAll();
  const handleInfoClick = (speaker) => {
    setCurrentSpeaker(speaker);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentSpeaker(null);
  };

  if (!speakers || speakers.length === 0) {
    return null;
  }
  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">
        Hosté
      </h2>
      <div className="container mx-auto flex flex-wrap justify-center gap-6">
        {speakers.length > 0 &&
          speakers.map((member, index) => (
            <div
              key={index}
              className="w-[220px] h-[260px] px-2 mb-8 cursor-pointer"
              onClick={() => handleInfoClick(member.attributes)}
            >
              <div className="overflow-hidden h-full bg-gray-200 rounded-lg shadow-lg">
                <img
                  src={member.attributes.picture.data.attributes.url}
                  alt={`${member.attributes.first_name} ${member.attributes.last_name}`}
                  className="w-[220px] h-[200px] object-cover"
                />
                <div className="bg-gray-200 text-center py-2 flex flex-col items-center">
                  <p className="text-lg flex items-center font-semibold text-black">
                    {`${member.attributes.first_name} ${member.attributes.last_name}`}
                  </p>
                  {member.attributes.website && (
                    <a
                      className="flex justify-center items-center gap-1 text-gray-700 hover:text-black mt-1"
                      href={`${member.attributes.website}`}
                    >
                      {member.attributes.website}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {currentSpeaker && (
        <SpeakerInfoModal
          showModal={showModal}
          onClose={handleCloseModal}
          speaker={currentSpeaker}
        />
      )}
    </div>
  );
};

export default Speakers;
