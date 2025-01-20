"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { PiReadCvLogo } from "react-icons/pi";
import { FiMinimize } from "react-icons/fi";
import { useTranslations } from "next-intl";

const Template1 = dynamic(() => import("@/components/templates/Template1"), {
  ssr: false,
});

const CVPreview = () => {
  const t = useTranslations("Template");
  const handlePrint = () => {
    window.print();
  };
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
        <div className="mb-2 text-center">
          <button
            onClick={handlePrint}
            className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 print:hidden"
          >
            {t("save")}
          </button>
        </div>
        <div className="w-full max-h-[90lvh] overflow-hidden print:overflow-visible scale-75 lg:scale-100 print:scale-100 flex">
          <Template1 />
        </div>
      </div>
    </>
  );
};

export default CVPreview;
