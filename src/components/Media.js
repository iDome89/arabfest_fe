import { useState } from "react";
import { MediaArticles } from "./MediaArticles";
import { PressReleases } from "./PressReleases";
import { useGetAll } from "@/features/useGetAll";

export const Media = () => {
  const [activeTab, setActiveTab] = useState("articles");
  const {color} = useGetAll();
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">
        Média
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
            Napsali o nás
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
