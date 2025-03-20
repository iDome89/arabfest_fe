import { useState } from "react";
import { useGetAll } from "@/features/useGetAll";
import { useTranslation } from "react-i18next";

export const Sponsors = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentSponsor, setCurrentSponsor] = useState(null);
  const [activeTab, setActiveTab] = useState("partners");
  const {t} = useTranslation();

  const { sponsors, color } = useGetAll();

  if (!sponsors || sponsors.length === 0) {
    return null;
  }

  const partners = sponsors.filter(
    (sponsor) => !sponsor.attributes.is_media_partner
  );
  const mediaPartners = sponsors.filter(
    (sponsor) => sponsor.attributes.is_media_partner
  );
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">{t("sponsors.title")}</h2>
      </div>
      <div
        role="tablist"
        className="flex flex-wrap space-x-2 mb-6 justify-center"
      >
        <button
          role="tab"
          className={`cursor-pointer px-4 py-2 rounded-lg mb-2 focus:outline-none`}
          style={{
            backgroundColor: activeTab === "partners" ? color : "#E5E7EB",
            color: activeTab === "partners" ? "white" : "#1F2937",
          }}
          onClick={() => setActiveTab("partners")}
        >
          {t("sponsors.title")}
        </button>
        <button
          role="tab"
          className={`cursor-pointer px-4 py-2 rounded-lg mb-2 focus:outline-none`}
          style={{
            backgroundColor: activeTab === "media-partners" ? color : "#E5E7EB",
            color: activeTab === "media-partners" ? "white" : "#1F2937",
          }}
          onClick={() => setActiveTab("media-partners")}
        >
          {t("sponsors.media")}
        </button>
      </div>
      {activeTab === "partners" && (
        <div className="flex flex-wrap justify-center gap-6">
          {partners.map((sponsor, index) => (
            <div
              key={index}
              className="w-full sm:w-[300px] bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative flex flex-col"
            >
              <a
                href={sponsor.attributes.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block flex-shrink-0"
              >
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
      )}
      {activeTab === "media-partners" && (
        <div className="flex flex-wrap justify-center gap-6">
          {mediaPartners.map((sponsor, index) => (
            <div
              key={index}
              className="w-full sm:w-[300px] bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative flex flex-col"
            >
              <a
                href={sponsor.attributes.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block flex-shrink-0"
              >
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
      )}
    </div>
  );
};

export default Sponsors;
