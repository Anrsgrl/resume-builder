import { cn } from "@/utils/helpers";
import Link from "next/link";
import React from "react";
import { MdArrowRightAlt } from "react-icons/md";

const CustomLink = ({
  children,
  href,
  animation,
  icon,
  prev,
  className,
  className__children,
  className__animation,
  ...props
}) => {
  return (
    <Link
      href={href}
      {...props}
      type="button"
      className={cn(
        `flex items-center gap-1 animation-all group overflow-hidden px-3 py-1 rounded-md text-main cursor-pointer border border-main hover:border-main hover:bg-main font-semibold select-none ${
          prev && "flex-row-reverse"
        }`,
        className
      )}
    >
      {animation && (
        <span
          className={cn(
            `transform animation-all group-hover:opacity-100 group-hover:text-white`,
            className__animation
          )}
        >
          <MdArrowRightAlt size={24} className={`${prev && "rotate-180"}`} />
        </span>
      )}
      <div
        className={cn(
          `uppercase text-sm animation-all group-hover:text-white`,
          className__children
        )}
      >
        {children}
      </div>
    </Link>
  );
};

export default CustomLink;
