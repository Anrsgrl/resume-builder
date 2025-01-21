import React from "react";
import ColorPicker from "@/components/shared/ColorPicker";
import useTemplateStore from "@/store/template";
import { useTranslations } from "next-intl";
import { MdKeyboardArrowLeft } from "react-icons/md";

const ColorMenu = ({ setTabMenu }) => {
  const {
    sectionHeadingColor,
    setSectionHeadingColor,
    headingColor,
    setHeadingColor,
    hyperlinkColor,
    setHyperlinkColor,
  } = useTemplateStore();
  const t = useTranslations("Template");
  return (
    <>
      {" "}
      <button
        onClick={() => setTabMenu("main")}
        type="button"
        className="px-4 py-2 text-sm flex items-center cursor-pointer animation-all hover:opacity-90 border-b border-zinc-100/20 mb-1"
      >
        <MdKeyboardArrowLeft /> {t("back")}
      </button>
      <div className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all">
        {t("section")}
        <ColorPicker
          id={`sectionHeading-color`}
          state={sectionHeadingColor}
          setState={setSectionHeadingColor}
        />
      </div>
      <div className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all">
        {t("heading")}
        <ColorPicker
          id={`heading-color`}
          state={headingColor}
          setState={setHeadingColor}
        />
      </div>
      <div className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all">
        {t("hyperlink")}
        <ColorPicker
          id={`hyperlink-color`}
          state={hyperlinkColor || "#0284c7"}
          setState={setHyperlinkColor}
        />
      </div>
    </>
  );
};

export default ColorMenu;
