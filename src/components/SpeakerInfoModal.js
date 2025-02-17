const SpeakerInfoModal = ({ showModal, onClose, speaker }) => {
  if (!showModal) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-box relative bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-screen overflow-y-auto">
        <img
          src={speaker.picture.data.attributes.url}
          alt={`${speaker.first_name} ${speaker.last_name}`}
          className="w-full h-[250px] object-contain mb-4"
        />
        <h3 className="font-bold text-xl sm:text-2xl text-black mb-4">{speaker?.first_name} {speaker?.last_name}</h3>
        <p className="text-black mb-4">
          {speaker?.description}
        </p>
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
      </div>
      <div className="cursor-pointer modal-backdrop fixed inset-0" onClick={onClose}></div>
    </div>
  );
};

export default SpeakerInfoModal;
