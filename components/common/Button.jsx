import React from "react";
import { MdArrowRightAlt } from "react-icons/md";

const Button = ({ children, animation, icon, ...props }) => {
  return (
    <button
      {...props}
      type="button"
      className="w-fit flex items-center justify-center gap-1 animation-all group overflow-hidden px-3 py-1.5 rounded-md text-main cursor-pointer border border-main hover:border-main hover:bg-main group font-semibold"
    >
      {animation && (
        <span className="transform -translate-x-5 animation-all group-hover:translate-x-0 opacity-0 group-hover:opacity-100 group-hover:text-white ">
          <MdArrowRightAlt size={24} />
        </span>
      )}
      <div
        className={`uppercase text-sm animation-all group-hover:text-white ${
          animation && "-translate-x-3 group-hover:translate-x-0"
        }`}
      >
        {children}
      </div>
    </button>
  );
};

export default Button;
