import React from "react";
import { useTranslations } from "next-intl";
import useStore from "@/store/store";
import useTemplateStore from "@/store/template";
import { FONTS, uiSans } from "@/utils/constants";
import Menu from "@/components/shared/settings/Menu";
import Button from "@/components/common/Button";
import ColorPicker from "@/components/shared/ColorPicker";
import { BiText } from "react-icons/bi";
import { MdInsertEmoticon, MdSaveAlt } from "react-icons/md";
import toast from "react-hot-toast";

const TemplateSettings = () => {
  const {
    name: templateName,
    setName: setTemplateName,
    sectionHeadingColor,
    setSectionHeadingColor,
    headingColor,
    setHeadingColor,
    hyperlinkColor,
    setHyperlinkColor,
    projectLink,
    setProjectLink,
    fontFamily,
    setFontFamily,
  } = useTemplateStore();
  const { name, surname } = useStore();
  const t = useTranslations("Template");

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = templateName || `${name} ${surname} - CV`;
    window.print();
    document.title = originalTitle;
  };

  const reset = () => {
    try {
      setTemplateName("CV");
      setSectionHeadingColor("");
      setHeadingColor("");
      setHyperlinkColor("");
      setProjectLink("");
      setFontFamily("");
      toast.success(t("success"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-4 text-center flex items-center justify-center gap-1 print:hidden">
      <Button onClick={handlePrint}>
        <div className="flex items-center gap-1">
          <MdSaveAlt size={20} /> {t("save")}
        </div>
      </Button>
      <Menu label={t("settings")}>
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
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="outline-0 border-0 bg-transparent border-b border-transparent focus:border-white/50 text-xs text-white/80 w-1/3 text-right"
          />
        </div>
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
        <div className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all">
          Font
          <select
            name="font-family"
            id="font-family"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="bg-transparent text-white/80 outline-none border-0 cursor-pointer"
          >
            <option
              value=""
              style={{ fontFamily: uiSans }}
              className="bg-back text-white"
            >
              default
            </option>
            {FONTS.map((e, index) => (
              <option
                key={index}
                value={e}
                style={{ fontFamily: e }}
                className="bg-back text-white"
              >
                {e}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={reset}
          type="button"
          className="px-4 py-2 text-sm flex items-center justify-between hover:bg-zinc-700 cursor-pointer rounded-md animation-all text-red-400 "
        >
          {t("reset")}
        </button>
      </Menu>
    </div>
  );
};

export default TemplateSettings;
