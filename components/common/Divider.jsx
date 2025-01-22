import React from "react";

const Divider = ({ text }) => {
  return (
    <div className="w-full flex items-center justify-center gap-1 my-1">
      <div className="bg-gradient-to-l from-zinc-600 via-zinc-600 to-transparen w-1/3 h-[1px]"></div>
      <div className="text-zinc-600 text-xs uppercase">{text}</div>
      <div className="bg-gradient-to-r from-zinc-600 via-zinc-600 to-transparent w-1/3 h-[1px]"></div>
    </div>
  );
};

export default Divider;
