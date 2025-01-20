import Link from "next/link";
import React from "react";
import { MdArrowRightAlt } from "react-icons/md";

const CustomLink = ({
  children,
  href,
  animation,
  icon,
  prev,
  full,
  closeXs,
  ...props
}) => {
  return (
    <Link
      href={href}
      {...props}
      type="button"
      className={`flex items-center gap-1 animation-all group overflow-hidden px-3 py-1 rounded-md text-main cursor-pointer border border-main hover:border-main hover:bg-main font-semibold ${
        full ? "w-full" : "w-fit"
      } ${prev && "flex-row-reverse"}`}
    >
      {animation && (
        <span
          className={`transform animation-all  opacity-0 group-hover:opacity-100 group-hover:text-white ${
            animation && !prev
              ? "-translate-x-5  group-hover:translate-x-0"
              : animation && prev
              ? "translate-x-5  group-hover:translate-x-0"
              : ""
          }`}
        >
          <MdArrowRightAlt size={24} className={`${prev && "rotate-180"}`} />
        </span>
      )}
      <div
        className={`uppercase text-sm animation-all group-hover:text-white ${
          closeXs ? "" : "hidden xs:block"
        } ${
          animation && !prev
            ? "-translate-x-3 group-hover:translate-x-0"
            : animation && prev
            ? "translate-x-4 group-hover:translate-x-0"
            : ""
        }`}
      >
        {children}
      </div>
    </Link>
  );
};

export default CustomLink;
