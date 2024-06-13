import React from "react";

const Lightbox = ({ isOpen, src, onClose, onNext, onPrev }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative flex justify-center">
        <button onClick={onClose} className="absolute top-[-25%] md:top-[-10%] right-[10px] lg:right-[20px] z-6 m-4 text-white text-2xl md:text-4xl">
          &times;
        </button>
        <img src={src} alt="Lightbox" className="max-w-[80%] max-h-full" />
        <button onClick={onPrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-3xl">
          &#8249;
        </button>
        <button onClick={onNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-3xl">
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Lightbox;