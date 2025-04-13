import { useState } from "react";
import { MediaArticles } from "./MediaArticles";
import { PressReleases } from "./PressReleases";
import { useGetAll } from "@/features/useGetAll";
import { useTranslation } from "react-i18next";

export const Media = () => {
  const [activeTab, setActiveTab] = useState("articles");
  const {t} = useTranslation();
  const { mediaArticles: articles, pressReleases, color } = useGetAll();
  if(!articles.length === 0 && !pressReleases.length === 0) return null;
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">
        {t("media.title")}
      </h2>
      <div className="max-w-7xl mx-auto min-h-[300px]">
        <div
          role="tablist"
          className="flex flex-wrap space-x-2 mb-6 justify-center"
        >
          <button
            role="tab"
            className={`cursor-pointer px-4 py-2 rounded-lg mb-2 focus:outline-none`}
            style={{
              backgroundColor: activeTab === "articles" ? color : "#E5E7EB",
              color: activeTab === "articles" ? "white" : "#1F2937",
            }}
            onClick={() => setActiveTab("articles")}
          >
           {t("media.wrote_about")}
          </button>
          <button
            role="tab"
            className={`cursor-pointer px-4 py-2 rounded-lg mb-2 focus:outline-none`}
            style={{
              backgroundColor:
                activeTab === "press-releases" ? color : "#E5E7EB",
              color: activeTab === "press-releases" ? "white" : "#1F2937",
            }}
            onClick={() => setActiveTab("press-releases")}
          >
            {t("media.paper_news")}
          </button>
        </div>

        {activeTab === "articles" && articles.length > 0 &&(
          <div>
            <div
              role="tablist"
              className="flex flex-wrap space-x-2 mb-6 justify-center"
            >
              <MediaArticles />
            </div>
          </div>
        )}
        {activeTab === "press-releases" && pressReleases.length > 0 && (
          <div>
            <div
              role="tablist"
              className="flex flex-wrap space-x-2 mb-6 justify-center"
            >
              <PressReleases />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
