import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import apiRequest from "../utils/apiRequest";

export const MediaArticles = () => {
  const [articles, setArticles] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    const locale = navigator.language;
    const formattedDate = date.toLocaleDateString(locale, options);
    const formattedTime = date.toLocaleTimeString(locale, options);
    return `${formattedDate} ${formattedTime}`;
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await apiRequest.get(
          "/media-articles?sort=id&populate=*",
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API}`,
            },
          }
        );

        setArticles(response.data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  if (!articles) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
      {articles.map((article, index) => {
        const content = article.attributes.content;

        return (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-[#22c55f] mb-2">
              {article.attributes.title}
            </h3>
            <div className="flex items-center col-span-4 my-4 gap-[5px]">
                  <p className="text-sm text-gray-700 font-semibold">
                    Na portálu: 
                  </p>
                  <a href={article.attributes.portal} className="text-xs text-gray-700 hover:text-black">
                    {article.attributes.portal}
                  </a>
                </div>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                children={content}
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    />
                  ),
                }}
              />
            </div>
            {article.attributes.original_link && (
              <div className="flex items-center col-span-4 mt-2 gap-[5px]">
                <a
                  href={article.attributes.original_link}
                  className="text-xs text-gray-700 hover:text-black"
                >
                  Původní článek
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
