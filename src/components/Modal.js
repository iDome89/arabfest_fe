import React from 'react';

const Modal = ({ showModal, onClose, sponsor }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-box relative bg-white p-6 rounded-lg shadow-lg">
        <img
                  src={sponsor.attributes.picture.data.attributes.url}
                  alt={sponsor.attributes.name}
                  className="max-h-full max-w-full object-contain"
                />
        <h3 className="font-bold text-lg text-black">{sponsor?.attributes.name}</h3>
        <p className="py-4 text-black">
        {sponsor?.attributes.description}
        </p>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
      </div>
      <div className="modal-backdrop fixed inset-0" onClick={onClose}></div>
    </div>
  );
};

export default Modal;
