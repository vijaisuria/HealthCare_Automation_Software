import React from "react";

const ConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <p className="mb-4 text-xl font-semibold">
          Student does not exist. Do you want to proceed by entering details
          manually?
        </p>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            onClick={onConfirm}
          >
            Proceed Manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
