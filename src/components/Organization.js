import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useGetAll } from "@/features/useGetAll";

export const Organization = () => {
  const [showMore, setShowMore] = useState(false);

  const { organization } = useGetAll();
  const truncateEllipsis = (str, maxLength = 300, visibleLength = 300) => {
    if (str.length <= maxLength) return str;
    
    // Find the last space before the limit
    const lastSpace = str.substring(0, visibleLength).lastIndexOf(' ');
    
    // If no space found, fall back to character truncation
    const breakPoint = lastSpace > 0 ? lastSpace : visibleLength;
    
    return `${str.substring(0, breakPoint)}...`;
  };
if(!organization) return null;
  return (
    <div className="bg-white pt-12 pb-4 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-12">
       {organization?.attributes.title}
      </h2>

      {/* Short Content (Always Visible) */}
      {showMore && (
        <div className="prose prose-lg mx-auto text-gray-700 max-w-none pb-0 lg:max-w-4xl text-center">
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
            {organization?.attributes?.description}
          </ReactMarkdown>
        </div>
      )}

      {/* Full Content (Visible on Show More) */}
      {!showMore && (
        <div className="prose prose-lg mx-auto text-gray-700 max-w-none lg:max-w-4xl p-6 pb-0 rounded-lg">
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
            {truncateEllipsis(organization.attributes.description)}
          </ReactMarkdown>
        </div>
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

export default Organization;
