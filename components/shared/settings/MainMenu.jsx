import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useTranslations } from "next-intl";
import useTemplateStore from "@/store/template";

const MainMenu = ({ setTabMenu, reset }) => {
  const { name, setName } = useTemplateStore();

  const t = useTranslations("Template");
  return (
    <>
      <button
        type="button"
        className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all text-center"
      >
        {t("change")}
      </button>
      <div className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all w-full font-normal">
        {t("name")}
        <input
          type="text"
          name="resume-name"
          id="resume-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="outline-0 border-0 bg-transparent border-b border-transparent focus:border-white/50 text-xs text-white/80 w-1/3 text-right"
        />
      </div>
      <button
        type="button"
        onClick={() => setTabMenu("colors")}
        className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all w-full font-normal"
      >
        {t("settingColor")}
        <MdKeyboardArrowRight />
      </button>
      <button
        type="button"
        onClick={() => setTabMenu("sections")}
        className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all w-full font-normal"
      >
        {t("settingSection")}
        <MdKeyboardArrowRight />
      </button>
      <button
        type="button"
        onClick={() => setTabMenu("fonts")}
        className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all w-full font-normal"
      >
        {t("settingFont")}
        <MdKeyboardArrowRight />
      </button>

      <button
        onClick={reset}
        type="button"
        className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all text-red-400 "
      >
        {t("reset")}
      </button>
    </>
  );
};

export default MainMenu;
