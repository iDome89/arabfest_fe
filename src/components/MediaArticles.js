import { useGetAll } from "@/features/useGetAll";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export const MediaArticles = () => {
  const { mediaArticles: articles, color } = useGetAll();
  const {t} = useTranslation();
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

if(!articles) return null;



  if (!articles || articles.length === 0) {
    return null;
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
            <h3 className="text-xl font-semibold mb-4" style={{color:color}}>
              <a href={article.attributes.portal}>{article.attributes.title}</a>
            </h3>

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
                  {t("media_articles.original_article")}
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
