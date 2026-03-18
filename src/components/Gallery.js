import { useState, useMemo } from "react";
import Lightbox from "./Lightbox";
import { useGetAll } from "@/features/useGetAll";
import { useTranslation } from "react-i18next";

export const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const {t} = useTranslation();
  const { gallery: images } = useGetAll();
  if (!images || !images.length > 0) return null;

  const uniqueCategories = new Map();
  images.forEach((item) => {
    const category = item.attributes.category?.data;
    if (category) {
      uniqueCategories.set(category.id, {
        name: category.attributes.name,
        thumbnail: category.attributes.thumbnail,
      });
    }
  });

  const categoriesArray = Array.from(uniqueCategories, ([id, value]) => ({
    id,
    name: value.name,
    thumbnail: value.thumbnail,
  }));

  const filteredImages = selectedCategoryId
    ? images.filter(
        (item) => item.attributes.category?.data?.id === selectedCategoryId
      )
    : images;

  const handleImageClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setPhotoIndex(0);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNext = () => {
    setPhotoIndex((photoIndex + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    setPhotoIndex((photoIndex + filteredImages.length - 1) % filteredImages.length);
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">{t("gallery.title")}</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {categoriesArray.length > 0 &&
          categoriesArray.map((category) => (
            <div
              key={category.id}
              onClick={() => handleImageClick(category.id)}
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
        src={filteredImages[photoIndex]?.attributes.image.data.attributes.url}
        photographerName={filteredImages[photoIndex]?.attributes.photographer_name}
        photographerUrl={filteredImages[photoIndex]?.attributes.photographer_website}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};
