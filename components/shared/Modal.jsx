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
      className="fixed top-0 left-0 bg-zinc-900/95 backdrop-blur-lg flex justify-center items-center z-[60] h-full w-full"
      onClick={handleOutsideClick}
    >
      <div
        className="rounded-md shadow-lg w-96 grid grid-cols-1 gap-2"
        onClick={handleModalClick}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
