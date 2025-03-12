import { useState } from "react";
import Lightbox from "./Lightbox";
import { useGetAll } from "@/features/useGetAll";

export const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const { gallery: images } = useGetAll();
  if (!images || !images.length > 0) return null;
  const uniqueCategories = new Map();
  images.forEach((item) => {
    const category = item.attributes.category?.data;
    if (category) {
      uniqueCategories.set(category.id, {
        name: category.attributes.name,
        thumbnail: category.attributes.thumbnail, // Store thumbnail properly
      });
    }
  });

  // Convert Map to Array
  const categoriesArray = Array.from(uniqueCategories, ([id, value]) => ({
    id,
    name: value.name,
    thumbnail: value.thumbnail,
  }));
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
        {categoriesArray.length > 0 &&
          categoriesArray.map((category, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(index)}
              className="cursor-pointer w-full sm:max-w-[220px] bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative flex flex-col"
            >
              <img
                src={category.thumbnail.data.attributes.url}
                alt={category.name}
                className="h-[200px] max-w-full object-cover"
              />
            </div>
          ))}
      </div>
      <Lightbox
        isOpen={isOpen}
        src={images[photoIndex]?.attributes.image.data.attributes.url}
        photographerName={images[photoIndex]?.attributes.photographer_name}
        photographerUrl={images[photoIndex]?.attributes.photographer_website}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};
