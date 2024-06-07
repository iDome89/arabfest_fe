import { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export const News = () => {
  const [news, setNews] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await apiRequest.get("/news?populate=*", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API}`,
          },
        });
        setNews(response.data.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  if (!news) {
    return <div>Loading...</div>;
  }

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

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 py-10">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">
        Novinky
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
        {news.map((article, index) => {
          const isExpanded = expandedIndex === index;
          const content = article.attributes.content;
          const truncatedContent =
            content.split(" ").slice(0, 30).join(" ") + "...";

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-[#22c55f] mb-2">
                {article.attributes.title}
              </h3>
              <p className="text-gray-500 mb-4">
                {formatDate(article.attributes.date) ??
                  formatDate(article.attributes.published_at)}
              </p>
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                  children={isExpanded ? content : truncatedContent}
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
              <button
                onClick={() => toggleExpand(index)}
                className="mt-4 text-blue-500 hover:underline"
              >
                {isExpanded ? "Méně" : "Více"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
