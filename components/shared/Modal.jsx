import { cn } from "@/utils/helpers";
import React from "react";

const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  className__children,
}) => {
  if (!isOpen) return null;

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleOutsideClick = () => {
    onClose();
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 bg-zinc-900/95 backdrop-blur-lg flex justify-center items-center z-[999] h-full w-full",
        className
      )}
      onClick={handleOutsideClick}
    >
      <div
        className={cn(
          "rounded-md shadow-lg w-96 grid grid-cols-1 gap-2",
          className__children
        )}
        onClick={handleModalClick}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
