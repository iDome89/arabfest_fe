const Lightbox = ({ isOpen, src, onClose, onNext, onPrev, photographerName, photographerUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative flex flex-col items-center">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="cursor-pointer absolute top-[-5px] right-2 text-white text-4xl"
        >
          &times;
        </button>

        {/* Image Container */}
        <div className="max-w-[90vw] max-h-[90vh] flex justify-center items-center">
          <img 
            src={src} 
            alt="Lightbox" 
            className="max-w-[80%] max-h-[80%] object-contain"
          />
            {photographerName && <a 
            href={photographerUrl} 
            target="_blank" 
            className="cursor-pointer text-white absolute bottom-2 left-6 text-lg z-10"
          >
           Fotograf: {photographerName}
          </a>}
        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={onPrev} 
          className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
        >
          &#8249;
        </button>
        <button 
          onClick={onNext} 
          className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
