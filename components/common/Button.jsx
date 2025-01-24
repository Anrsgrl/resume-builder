import { cn } from "@/utils/helpers";
import React from "react";
import { MdArrowRightAlt } from "react-icons/md";

const Button = ({
  children,
  animation,
  icon,
  className,
  className__children,
  ...props
}) => {
  return (
    <button
      {...props}
      type="button"
      className={cn(
        "w-fit flex items-center justify-center gap-1 animation-all group overflow-hidden px-3 py-1.5 rounded-md text-main cursor-pointer border border-main hover:bg-main group font-semibold",
        className
      )}
    >
      {animation && (
        <span className="transform -translate-x-5 animation-all group-hover:translate-x-0 opacity-0 group-hover:opacity-100 group-hover:text-white ">
          <MdArrowRightAlt size={24} />
        </span>
      )}
      <div
        className={cn(
          `uppercase text-xs sm:text-sm animation-all group-hover:text-white select-none`,
          className__children
        )}
      >
        {children}
      </div>
    </button>
  );
};

export default Button;
