import { useState } from "react";
import { MediaArticles } from "./MediaArticles";
import { PressReleases } from "./PressReleases";

export const Media = () => {
  const [activeTab, setActiveTab] = useState("articles");
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">
        Media
      </h2>
      <div className="max-w-7xl mx-auto min-h-[300px]">
        <div
          role="tablist"
          className="flex flex-wrap space-x-2 mb-6 justify-center"
        >
          <button
            role="tab"
            className={`px-4 py-2 rounded-lg mb-2 ${
              activeTab === "articles"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800"
            } focus:outline-none`}
            onClick={() => setActiveTab("articles")}
          >
            Napsali o nás
          </button>
          <button
            role="tab"
            className={`px-4 py-2 rounded-lg mb-2 ${
              activeTab === "press-releases"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800"
            } focus:outline-none`}
            onClick={() => setActiveTab("press-releases")}
          >
            Tiskové zprávy
          </button>
        </div>

        {activeTab === "articles" && (
          <div>
            <div
              role="tablist"
              className="flex flex-wrap space-x-2 mb-6 justify-center"
            >
              <MediaArticles />
            </div>
          </div>
        )}
        {activeTab === "press-releases" && (
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
