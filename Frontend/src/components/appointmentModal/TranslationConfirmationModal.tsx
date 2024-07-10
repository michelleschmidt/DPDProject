import React from "react";

interface TranslationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const TranslationBookingModal: React.FC<TranslationBookingModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          Confirm Booking of Translation Service
        </h2>
        <p>
          With the booking of our translation service you agree to sharing your
          data with our partner.
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranslationBookingModal;
