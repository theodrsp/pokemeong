import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/2">
        {children}
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">✖️</button>
      </div>
    </div>
  );
};

export default Modal;
