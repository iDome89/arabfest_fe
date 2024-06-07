import { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        console.log("Fetched about data:", response.data.data);
        setAbout(response.data.data);
      } catch (error) {
        console.error("Error fetching about info:", error);
      }
    };
    fetchAbout();
  }, []);

  const carouselItems = [
    "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg",
    "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg",
    "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg",
    "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  if (!about) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">O festivalu</h2>
        <div className="prose prose-lg mx-auto text-gray-700 max-w-none lg:max-w-4xl">
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
      <div className="relative w-full overflow-hidden mb-12">
        <Slider {...settings}>
          {carouselItems.map((item, index) => (
            <div key={index} className="w-full h-64 sm:h-80 lg:h-96">
              <img src={item} className="w-full h-full object-cover" alt={`Carousel item ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default About;
