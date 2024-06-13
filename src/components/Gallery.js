import { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import Lightbox from "./Lightbox";

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await apiRequest.get("/images?sort=id&populate=*", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API}`,
          },
        });

        setImages(response.data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchImages();
  }, []);

  if (!images) {
    return <div>Loading...</div>;
  }

  const handleImageClick = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNext = () => {
    setPhotoIndex((photoIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setPhotoIndex((photoIndex + images.length - 1) % images.length);
  };
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Galerie</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {images.length > 0 &&
          images.map((image, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(index)}
              className="w-full sm:w-[300px] bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative flex flex-col"
            >
              <img
                src={image.attributes.image.data.attributes.url}
                alt={image.attributes.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
      </div>
      <Lightbox
        isOpen={isOpen}
        src={images[photoIndex]?.attributes.image.data.attributes.url}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};
