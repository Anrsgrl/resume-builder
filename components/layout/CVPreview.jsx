"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { PiReadCvLogo } from "react-icons/pi";
import { FiMinimize } from "react-icons/fi";
import TemplateSettings from "@/components/settings/TemplateSettings";
import Loading from "@/components/shared/Loading";
import ChangeTemplate from "@/components/settings/ChangeTemplate";
import useTemplateStore from "@/store/template";

const Template1 = dynamic(() => import("@/components/templates/Template1"), {
  ssr: false,
  loading: () => <Loading />,
});
const Template2 = dynamic(() => import("@/components/templates/Template2"), {
  ssr: false,
  loading: () => <Loading />,
});

const CVPreview = () => {
  const { template, setTemplate } = useTemplateStore();
  const [show, setShow] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);
  const openReview = () => {
    setShow(!show);
    if (show) {
      document.documentElement.style.overflow = "unset";
    } else {
      document.documentElement.style.overflow = "hidden";
    }
  };

  //* Shortcuts
  const handleKeyPress = useCallback((event) => {
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault();
      window.print();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

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
      <ChangeTemplate open={templateModal} setOpen={setTemplateModal} />
      <div
        className={`flex flex-col items-center justify-center print:h-fit animation-all ${
          show
            ? "fixed print:relative inset-0 z-40 overflow-visible py-4 print:py-0 bg-zinc-900/50 min-h-[95lvh] backdrop-blur-lg"
            : "hidden xl:block print:block max-h-[95lvh] print:max-h-fit overflow-auto"
        }`}
      >
        <TemplateSettings
          openReview={openReview}
          show={show}
          templateModal={templateModal}
          setTemplateModal={setTemplateModal}
        />
        <div
          className={`w-full overflow-auto print:overflow-visible print:w-full print:flex print:justify-start print:grow print:m-0 print:p-0 ${
            show ? "h-[90lvh] print:h-fit print:overflow-hidden" : ""
          }`}
        >
          {
            {
              1: <Template1 />,
              2: <Template2 />,
            }[template.templateNumber]
          }
        </div>
      </div>
    </>
  );
};

export default CVPreview;
