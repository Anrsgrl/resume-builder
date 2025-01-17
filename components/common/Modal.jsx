import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleOutsideClick = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-[60]"
      onClick={handleOutsideClick}
    >
      <div
        className="rounded-lg shadow-lg w-96 grid grid-cols-1 gap-2"
        onClick={handleModalClick}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
