import { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export const News = () => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchnews = async () => {
      try {
        const response = await apiRequest.get("/news?populate=*", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API}`,
          },
        });
        setNews(response.data.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchnews();
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

    const formattedDate = date.toLocaleDateString(locale, {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    return `${formattedDate} ${formattedTime}`;
  };
  return (
    <div className="bg-white">
      <h2 className="text-2xl text-center font-bold text-gray-800">News</h2>
      <div className="grid grid-cols-3 ">
        {news.map((article, index) => (
          <div>
            <h2>{article.attributes.title}</h2>
            <p>
              {formatDate(article.attributes.date) ??
                formatDate(article.attributes.published_at)}
            </p>
            <ReactMarkdown
              children={article.attributes.content}
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" />
                ),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
