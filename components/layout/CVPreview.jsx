"use client";
import Template1 from "@/components/templates/Template1";
import { useState } from "react";
import { FaWindowMinimize } from "react-icons/fa";
import { PiReadCvLogo } from "react-icons/pi";
import { FiMinimize } from "react-icons/fi";
const CVPreview = () => {
  const handlePrint = () => {
    window.print();
  };
  const [show, setShow] = useState(false);

  const openReview = () => {
    setShow(!show);
  };
  return (
    <>
      <button
        onClick={openReview}
        type="button"
        className="fixed bottom-4 right-4 w-16 h-16 bg-main hover:bg-main/90 animation-all rounded-full flex items-center justify-center group/mobile xl:hidden print:hidden cursor-pointer z-50"
      >
        {show ? (
          <FiMinimize
            size={36}
            color="white"
            className="group-hover/mobile:rotate-[360deg] group-hover/mobile:scale-95 animation-all"
          />
        ) : (
          <PiReadCvLogo
            size={36}
            color="white"
            className="group-hover/mobile:rotate-[360deg] group-hover/mobile:scale-95 animation-all"
          />
        )}
      </button>
      <div
        className={`flex flex-col items-center justify-center  print:h-max ${
          show
            ? "absolute inset-0 z-40 overflow-visible py-4 print:py-0 bg-black/80 h-[100dvh]"
            : "hidden xl:block print:block h-[95dvh]"
        }`}
      >
        <div className="mb-2 text-center">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 print:hidden"
          >
            Save Resume as PDF
          </button>
        </div>
        <div className="w-full max-h-[90dvh] overflow-auto print:overflow-visible scale-75 lg:scale-100 print:scale-100">
          <Template1 />
        </div>
      </div>
    </>
  );
};

export default CVPreview;
