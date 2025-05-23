import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useGetAll } from "@/features/useGetAll";
import { useTranslation } from "react-i18next";

export const News = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const {t} = useTranslation();
  const { news } = useGetAll();
  if (!news || news.length === 0) {
    return null;
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
        {t("news.title")}
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
                className="cursor-pointer mt-4 text-blue-500 hover:underline"
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
