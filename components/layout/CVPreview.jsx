"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { PiReadCvLogo } from "react-icons/pi";
import { FiMinimize } from "react-icons/fi";
import TemplateSettings from "../shared/TemplateSettings";

const Template1 = dynamic(() => import("@/components/templates/Template1"), {
  ssr: false,
});

const CVPreview = () => {
  const [show, setShow] = useState(false);

  const openReview = () => {
    setShow(!show);
    if (show) {
      document.documentElement.style.overflow = "unset";
    } else {
      document.documentElement.style.overflow = "hidden";
    }
  };
  return (
    <>
      <button
        onClick={openReview}
        type="button"
        className="fixed bottom-4 right-4 w-14 h-14 sm:w-16 sm:h-16 bg-main hover:bg-main/90 animation-all rounded-full flex items-center justify-center group/mobile xl:hidden print:hidden cursor-pointer z-50"
      >
        {show ? (
          <FiMinimize
            color="white"
            className="group-hover/mobile:rotate-[360deg] group-hover/mobile:scale-95 animation-all w-8 h-8 sm:w-9 sm:h-9"
          />
        ) : (
          <PiReadCvLogo
            color="white"
            className="group-hover/mobile:rotate-[360deg] group-hover/mobile:scale-95 animation-all w-8 h-8 sm:w-9 sm:h-9"
          />
        )}
      </button>
      <div
        className={`flex flex-col items-center justify-center print:h-max ${
          show
            ? "fixed print:relative inset-0 z-40 overflow-visible py-4 print:py-0 bg-black/80 h-lvh"
            : "hidden xl:block print:block h-[95dvh]"
        }`}
      >
        <TemplateSettings />
        <div className="w-full max-h-[90lvh] overflow-hidden lg:overflow-auto print:overflow-visible scale-75 lg:scale-100 print:scale-100 flex">
          <Template1 />
        </div>
      </div>
    </>
  );
};

export default CVPreview;
