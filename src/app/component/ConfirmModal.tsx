import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 rounded py-2 px-4 hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="bg-primary-light text-white rounded py-2 px-4 hover:bg-red-600"
          >
            Ya
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
