import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useGetAll } from "@/features/useGetAll";
import { useTranslation } from "react-i18next";

export const About = () => {
  const [showMore, setShowMore] = useState(false);
  const {t} = useTranslation();
  const { about } = useGetAll();
if(!about) return null;
  return (
    <div className="bg-white pt-12 pb-4 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-12">
       {t("about.title")}
      </h2>

      {/* Short Content (Always Visible) */}
      {!showMore && (
        <div className="prose prose-lg mx-auto text-gray-700 max-w-none mb-8 lg:max-w-4xl text-center">
          <ReactMarkdown
            className="prose prose-lg whitespace-pre-line"
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm, remarkBreaks]} // ✅ Use remarkBreaks
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
          >
            {about.attributes.short_content}
          </ReactMarkdown>
        </div>
      )}

      {/* Full Content (Visible on Show More) */}
      {showMore && (
        <>
          {about.attributes.info_top && (
            <div className="prose prose-lg mx-auto text-gray-700 max-w-none lg:max-w-4xl mb-8 p-6 rounded-lg bg-gray-200">
              <ReactMarkdown
                className="prose prose-lg whitespace-pre-line"
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm, remarkBreaks]} // ✅ Use remarkBreaks
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
              >
                {about.attributes.info_top}
              </ReactMarkdown>
            </div>
          )}

          <div className="prose prose-lg mx-auto text-gray-700 max-w-none lg:max-w-4xl mb-8">
            <ReactMarkdown
              className="prose prose-lg whitespace-pre-line"
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm, remarkBreaks]} // ✅ Use remarkBreaks
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
            >
              {about.attributes.full_content}
            </ReactMarkdown>
          </div>

          {about.attributes.info_bottom && (
            <div className="prose prose-lg mx-auto text-gray-700 max-w-none lg:max-w-4xl mb-8 p-6 rounded-lg bg-gray-200">
              <ReactMarkdown
                className="prose prose-lg whitespace-pre-line"
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm, remarkBreaks]} // ✅ Use remarkBreaks
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
              >
                {about.attributes.info_bottom}
              </ReactMarkdown>
            </div>
          )}
        </>
      )}

      {/* Show More / Show Less Button */}
      <div className="flex justify-end items-center max-w-4xl mx-auto">
        <button
          onClick={() => setShowMore(!showMore)}
          className="cursor-pointer mt-4 text-blue-500 hover:underline"
        >
          {showMore ? "Méně" : "Více"}
        </button>
      </div>
    </div>
  );
};

export default About;
