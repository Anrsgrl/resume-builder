import useTemplateStore from "@/store/template";
import { useTranslations } from "next-intl";
import React from "react";
import { BiText } from "react-icons/bi";
import { MdInsertEmoticon, MdKeyboardArrowLeft } from "react-icons/md";

const SectionMenu = ({ setTabMenu }) => {
  const { projectLink, setProjectLink } = useTemplateStore();
  const t = useTranslations("Template");
  return (
    <>
      <button
        onClick={() => setTabMenu("main")}
        type="button"
        className="px-4 py-2 text-sm flex items-center cursor-pointer animation-all hover:opacity-90 border-b border-zinc-100/20 mb-1"
      >
        <MdKeyboardArrowLeft /> {t("back")}
      </button>
      <div className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all">
        {t("project")}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setProjectLink("")}
            className={`${projectLink === "" ? "text-main" : ""}`}
          >
            <BiText size={16} />
          </button>
          <button
            type="button"
            onClick={() => setProjectLink("icon")}
            className={`${projectLink === "icon" ? "text-main" : ""}`}
          >
            <MdInsertEmoticon size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default SectionMenu;
