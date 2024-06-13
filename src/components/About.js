import { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export const About = () => {
  const [about, setAbout] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await apiRequest.get("/about?populate=*", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API}`,
          },
        });
        setAbout(response.data.data);
      } catch (error) {
        console.error("Error fetching about info:", error);
      }
    };
    fetchAbout();
  }, []);

  if (!about) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white pt-12 pb-4 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-12">
        O festivalu
      </h2>
      {!showMore && (
        <div>
          <div className="prose prose-lg mx-auto text-center text-gray-700 max-w-none mb-8 lg:max-w-4xl">
            <ReactMarkdown
              children={about.attributes.short_content}
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
        </div>
      )}
      <div>
        {showMore && (
          <>
            {about.attributes.info_top && (
              <div className="prose prose-lg mx-auto text-gray-700 max-w-none lg:max-w-4xl mb-8 p-6 rounded-lg bg-gray-200">
                <ReactMarkdown
                  children={about.attributes.info_top}
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
            )}

            <div className="prose prose-lg mx-auto text-gray-700 max-w-none mb-8 lg:max-w-4xl">
              <ReactMarkdown
                children={about.attributes.full_content}
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
            {about.attributes.info_bottom && (
              <div className="prose prose-lg mx-auto text-gray-700 max-w-none lg:max-w-4xl mb-8 p-6 rounded-lg bg-gray-200">
                <ReactMarkdown
                  children={about.attributes.info_bottom}
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
            )}
          </>
        )}
        <div className="flex justify-end items-center max-w-4xl">
          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-4 text-blue-500 hover:underline"
          >
            {showMore ? "Méně" : "Více"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
