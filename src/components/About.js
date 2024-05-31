import { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export const About = () => {
  const [about, setAbout] = useState(null);

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
  console.log(about);
  return (
    <div className="bg-white py-12 px-6">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-800">O festivalu</h2>
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
      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
            className="w-full"
          />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
            className="w-full"
          />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
            className="w-full"
          />
        </div>
        <div id="item4" className="carousel-item w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
            className="w-full"
          />
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
        <a href="#item4" className="btn btn-xs">
          4
        </a>
      </div>
    </div>
  );
};

export default About;
