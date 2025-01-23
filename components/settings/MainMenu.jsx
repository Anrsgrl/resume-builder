import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useTranslations } from "next-intl";
import useTemplateStore from "@/store/template";

const MainMenu = ({ setTabMenu, setTemplateModal, reset }) => {
  const {
    template: { name },
    setTemplate,
  } = useTemplateStore();

  const t = useTranslations("Template");
  return (
    <>
      <button
        type="button"
        className="menu-item text-center"
        onClick={() => setTemplateModal(true)}
      >
        {t("change")}
      </button>
      <div className="menu-item w-full font-normal">
        {t("name")}
        <input
          type="text"
          name="resume-name"
          id="resume-name"
          value={name}
          onChange={(e) => setTemplate("name", e.target.value)}
          className="outline-0 border-0 bg-transparent border-b border-transparent focus:border-white/50 text-xs text-white/80 w-1/3 text-right"
        />
      </div>
      <button
        type="button"
        onClick={() => setTabMenu("colors")}
        className="menu-item w-full font-normal"
      >
        {t("settingColor")}
        <MdKeyboardArrowRight />
      </button>
      <button
        type="button"
        onClick={() => setTabMenu("sections")}
        className="menu-item w-full font-normal"
      >
        {t("settingSection")}
        <MdKeyboardArrowRight />
      </button>
      <button
        type="button"
        onClick={() => setTabMenu("fonts")}
        className="menu-item w-full font-normal"
      >
        {t("settingFont")}
        <MdKeyboardArrowRight />
      </button>
      <button
        type="button"
        onClick={() => setTabMenu("margin")}
        className="menu-item w-full font-normal"
      >
        {t("custom")}
        <MdKeyboardArrowRight />
      </button>

      <button onClick={reset} type="button" className="menu-item text-red-400 ">
        {t("reset")}
      </button>
    </>
  );
};

export default MainMenu;
