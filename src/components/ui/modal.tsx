import React from "react";

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = ({  children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-7 rounded-lg max-w-lg w-full">
        <div className="flex justify-between items-center">
        </div>
        <div >{children}</div>
      </div>
    </div>
  );
};

export default Modal;
